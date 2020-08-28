export class EditRecipeDto {
    name: string;
    categoryId: number;
    instructions: string;
    ingredients: {
        ingredientId: number;
        amount: string; 
    } [];
}