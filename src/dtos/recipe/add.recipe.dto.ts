export class AddRecipeDto {
    name: string;
    categoryId: number;
    administratorId: number;
    instructions: string;
    ingredients: {
        ingredientId: number;
        amount: string; 
    } [];
}