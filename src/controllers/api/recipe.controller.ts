import { Controller, Post, Body, Param, UseInterceptors, UploadedFile, Req } from "@nestjs/common";
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
import { request } from "express";

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
            ingredients: {
                eager: true
            }
            
            
        }
    }
})
export class RecipeController {
    constructor(public service: RecipeService,
                public recipeImageService: RecipeImageService) {}

    @Post('createFull')  // POST http://localhost:3000/api/recipe/createFull/
    createFullRecipe(@Body() data: AddRecipeDto) {
        return this.service.createFullRecipe(data);
    }

    @Post('/:id/uploadPhoto/') // POST http://localhost:3000/api/recipe/:id/uploadPhoto/
    @UseInterceptors(
        FileInterceptor('photo', {
           storage: diskStorage({
               destination: StorageConfig.photoDestination,
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
               fileSize: StorageConfig.photoMaxFileSize,
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
        const newPhoto: RecipeImage = new RecipeImage();
        newPhoto.recipeId = recipeId;
        newPhoto.imagePath = photo.filename;

        const savedPhoto = await this.recipeImageService.add(newPhoto);
        if (!savedPhoto) {
            return new ApiResponse('error', -4001)
        }

        return savedPhoto;

    }
}