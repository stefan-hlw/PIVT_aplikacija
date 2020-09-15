export default class DistinctIngredientsDto {
    ingredients: {
        ingredientId: number;
        name: string;
        amounts: string[];
    }[];
}