import { Controller, Post, Body, Param, UseInterceptors, UploadedFile, Req, Delete, Patch, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Recipe } from "src/entities/recipe.entity";
import { RecipeService } from "src/services/recipe/recipe.service";
import { AddRecipeDto } from "src/dtos/recipe/add.recipe.dto";
import { FileInterceptor } from "@nestjs/platform-express"
import { StorageConfig } from "config/storage.config";
import { diskStorage } from "multer";
import { RecipeImageService } from "src/services/recipe-image/recipe-image.service";
import { RecipeImage } from "src/entities/recipe-image.entity";
import { ApiResponse } from "src/misc/api.response.class";
import * as fileType from 'file-type';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { EditRecipeDto } from "src/dtos/recipe/edit.recipe.dto";
import { RecipeSearchDto } from "src/dtos/recipe/recipe.search.dto";

@Controller('api/recipe')
@Crud({
    model: {
        type: Recipe
    },
    params: {
        id: {
            field: 'recipeId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            recipeImages: {
                eager: true
            },
            recipeIngredients: {
                eager: true
            },
            ingredients: {
                eager: true
            },
            category: {
                eager: true
            },
            
            
        }
    },
    routes: {
        exclude: [ 'updateOneBase', 'replaceOneBase', 'deleteOneBase' ],
    }
})
export class RecipeController {
    constructor(
        public service: RecipeService,
        public recipeImageService: RecipeImageService) {}

    @Post('createFull')  // POST http://localhost:3000/api/recipe/createFull/
    createFullRecipe(@Body() data: AddRecipeDto) {
        return this.service.createFullRecipe(data);
    }

    @Patch(':id')
    editFullRecipe(@Param('id') id:number, @Body() data: EditRecipeDto) {
         return this.service.editFullRecipe(id, data);
    }
 

    @Post('/:id/uploadPhoto/') // POST http://localhost:3000/api/recipe/:id/uploadPhoto/
    @UseInterceptors(
        FileInterceptor('photo', {
           storage: diskStorage({
               destination: StorageConfig.photo.destination,
               filename: (req, file, callback) => {   // generates photo file name 
                    let original: string = file.originalname;
                    let normalized = original.replace(/\s+/g, '-');
                    normalized = normalized.replace(/[^A-z0-9\.\-]/g, '');
                    let sada = new Date();
                    let datePart = '';
                    datePart += sada.getFullYear().toString();
                    datePart += (sada.getMonth() +1).toString();
                    datePart += sada.getDate().toString();

                    // Adding random value to the filename to avoid duplicate names
                    let randomPart: string =
                    new Array(10)
                        .fill(0)
                        .map(e => (Math.random() * 9).toFixed(0).toString())
                        .join('');

                    let fileName = datePart + '-' + randomPart + '-' + normalized;
                    fileName = fileName.toLocaleLowerCase();
                    callback(null, fileName);
               }
           }),
           fileFilter: (req, file, callback) => {
               // File extension check (.jpg and .png are valid)
               if (!file.originalname.match(/\.(jpg|png)$/)) {
                   req.fileFilterError = 'Bad file extension!';
                   callback(null, false);
                   return; 
               }

               // File content check (data type)
               if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
                req.fileFilterError = 'Bad file content!';
                callback(null, false);
                return;
               }

               callback(null, true);
           },
           limits: {
               files: 1,
               fileSize: StorageConfig.photo.maxSize,
           },
        })
    )

    // Recipe image upload 
    async uploadPhoto(
        @Param('id') recipeId: number, 
        @UploadedFile() photo,
        @Req() req
        ): Promise<ApiResponse | RecipeImage> {
            if (req.fileFilterError) {
                return new ApiResponse('error', -4002, req.fileFilterError);
            }

            if (!photo) {
                return new ApiResponse('error', -4002, 'File not uploaded');
            }


            const fileTypeResult = await fileType.fromFile(photo.path);
            if(!fileTypeResult) {
                fs.unlinkSync(photo.path);
                return new ApiResponse('error', -4002, 'Cannot detect file type');
            }

            // File type check
            const realMimeType = fileTypeResult.mime;
            if (!(realMimeType.includes('jpeg') || realMimeType.includes('png'))) {
                return new ApiResponse('error', -4002, 'Bad file content type!');
            }
            
            await this.createResizedImage(photo, StorageConfig.photo.resize.thumb);
            await this.createResizedImage(photo, StorageConfig.photo.resize.small);

        const newPhoto: RecipeImage = new RecipeImage();
        newPhoto.recipeId = recipeId;
        newPhoto.imagePath = photo.filename;

        const savedPhoto = await this.recipeImageService.add(newPhoto);
        if (!savedPhoto) {
            return new ApiResponse('error', -4001)
        }

        return savedPhoto;

    }
    async createResizedImage(photo, resizeSettings) {
        const originalFilePath = photo.path;
        const fileName = photo.filename;

        const destinationFilePath = 
            StorageConfig.photo.destination +
            resizeSettings.directory +
            fileName;

        await sharp(originalFilePath)
            .resize({
                fit: 'cover',
                width: resizeSettings.width,
                height: resizeSettings.height,
            })
            .toFile(destinationFilePath);
    };

    // http://localhost:3000/api/recipe/4/deletePhoto/2/
    @Delete(':recipeId/deletePhoto/:photoId/') 
    public async deletePhoto(
        @Param('recipeId') recipeId: number,
        @Param('photoId') photoId: number,
    ) {
        const photo = await this.recipeImageService.findOne({
            recipeId: recipeId,
            imgId: photoId
        });
        if(!photo) {
            return new ApiResponse('error', -4004, 'Image not found');
        }
        try {
             fs.unlinkSync(StorageConfig.photo.destination + photo.imagePath);
             fs.unlinkSync(StorageConfig.photo.destination + StorageConfig.photo.resize.thumb.directory + photo.imagePath);
             fs.unlinkSync(StorageConfig.photo.destination + StorageConfig.photo.resize.small.directory + photo.imagePath);
       } catch (e) {}

        const deleteResult = await this.recipeImageService.deleteById(photoId);

        if(deleteResult.affected === 0 ) {
            return new ApiResponse('error', -4004, 'Photo not found');
        }
        return new ApiResponse('ok', 0, 'One photo deleted!')
    }

    @Post('search')
    async search(@Body() data: RecipeSearchDto): Promise<Recipe[] | ApiResponse> {
        return await this.service.search(data);
    }
    }