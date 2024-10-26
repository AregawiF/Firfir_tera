import { useState } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';

type DishFormFields = {
    name: string;
    description: string;
    image: FileList;
    timeInMinutes: number;
    servings: number;
    fasting: string;
    mealType: string;
    ingredients: { name: string }[];
    steps: { step: string }[];
};

const AddDishForm = () => {
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<DishFormFields>({
        defaultValues: {
            ingredients: [{ name: '' }],
            steps: [{ step: '' }]
        }
    });

    const { fields: ingredientFields, append: addIngredient, remove: removeIngredient } = useFieldArray({
        control,
        name: "ingredients"
    });
    
    const { fields: stepFields, append: addStep, remove: removeStep } = useFieldArray({
        control,
        name: "steps"
    });

    const onSubmit: SubmitHandler<DishFormFields> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=''>
            <div className="flex flex-col items-center mt-4">
                <input {...register("name", { required: "Dish name is required" })} type="text" placeholder="Dish Name" className='border-2 border-gray-400 rounded-lg p-2 w-2/5'/>
                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}

                <textarea {...register("description", { required: "Description is required" })} placeholder="Description" className='border-2 border-gray-400 rounded-lg p-2 my-4 h-32 w-2/5'/>
                {errors.description && <p className='text-red-500'>{errors.description.message}</p>}

                <input {...register("image", { required: "Image is required" })} type="file" accept="image/*" className='my-4 w-2/5'/>
                {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                <div className="time-serving w-2/5  flex justify-around">
                  <input {...register("timeInMinutes", { required: "Time is required" })} type="number" placeholder="Time (min)" className='border-2 border-gray-400 rounded-lg p-2 mt-4 w-1/5'/>
                  {errors.timeInMinutes && <p className='text-red-500'>{errors.timeInMinutes.message}</p>}

                  <input {...register("servings", { required: "Number of people is required" })} type="number" placeholder="Servings" className='border-2 border-gray-400 rounded-lg p-2 mt-4 w-1/5'/>
                  {errors.servings && <p className='text-red-500'>{errors.servings.message}</p>}
                </div>

                <div className='my-4 mt-8'>
                    <label className='mr-2 text-xl'>Is it fasting?</label>
                    <input {...register("fasting", { required: "Please select an option" })} type="radio" value="fasting" className="ml-2 size-4"/> Fasting
                    <input {...register("fasting", { required: "Please select an option" })} type="radio" value="nonfasting" className="ml-10 size-4"/> Non-fasting
                    {errors.fasting && <p className='text-red-500'>{errors.fasting.message}</p>}
                </div>

                <select {...register("mealType", { required: "Please select a meal type" })} className="border-2 border-gray-400 rounded-lg p-2 mt-4 w-1/5">
                    <option value="">Select Meal Type</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                </select>
                {errors.mealType && <p className='text-red-500'>{errors.mealType.message}</p>}

                <div className="mt-4 w-2/5">
                    <label>Ingredients:</label>
                    {ingredientFields.map((field, index) => (
                        <div key={field.id} className="flex items-center mt-2">
                            <input {...register(`ingredients.${index}.name` as const, { required: "Ingredient is required" })} placeholder="Ingredient" className="border-2 border-gray-400 rounded-lg p-2 w-full"/>
                            {ingredientFields.length > 1 && (
                                <button type="button" onClick={() => removeIngredient(index)} className="ml-2 text-red-500">Remove</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={() => addIngredient({ name: '' })} className="mt-2 text-blue-500">Add Ingredient</button>
                </div>
                
                <div className="mt-4 w-2/5">
                    <label>Steps:</label>
                    {stepFields.map((field, index) => (
                        <div key={field.id} className="flex items-center mt-2">
                            <input {...register(`steps.${index}.step` as const, { required: "Step is required" })} placeholder="Step" className="border-2 border-gray-400 rounded-lg p-2 w-full"/>
                            {stepFields.length > 1 && (
                                <button type="button" onClick={() => removeStep(index)} className="ml-2 text-red-500">Remove</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={() => addStep({ step: '' })} className="mt-2 text-blue-500">Add Step</button>
                </div>

                <button type="submit" className={`p-3 rounded-lg bg-green-700 text-white font-semibold mt-7 w-1/5 ${isSubmitting ? 'bg-green-400': ''}`} disabled={isSubmitting}>
                    {isSubmitting ? 'Loading...' : 'Add Dish'}
                </button>
            </div>
        </form>
    );
};

export default AddDishForm;
