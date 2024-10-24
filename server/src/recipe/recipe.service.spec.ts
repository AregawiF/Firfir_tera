import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { JwtPayload, RecipeService } from "./recipe.service";
import { Category, Recipe } from "../schemas/recipe.schema";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Model } from "mongoose";

describe("RecipeService", () => {
  let service: RecipeService;
  let model: Model<Recipe>;

  const mockRecipeModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: getModelToken(Recipe.name),
          useValue: mockRecipeModel,
        },
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
    model = module.get<Model<Recipe>>(getModelToken(Recipe.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("showAll", () => {
    it("should return all recipes", async () => {
      const mockRecipes: Recipe[] = [
        {
          name: "Spaghetti Bolognese",
          description: "Classic Italian pasta dish",
          cookTime: 30,
          people: 4,
          ingredients: ["Spaghetti", "Tomato Sauce", "Ground Beef"],
          steps: ["Boil water", "Cook spaghetti", "Prepare Bolognese sauce"],
          fasting: false,
          type: Category.DINNER,
          image: "https://example.com/spaghetti-bolognese.jpg",
          cook_id: "5f62e1c3e065bb001f34c421",
        },
        {
          name: "Spaghetti Bolognese",
          description: "Classic Italian pasta dish",
          cookTime: 30,
          people: 4,
          ingredients: ["Spaghetti", "Tomato Sauce", "Ground Beef"],
          steps: ["Boil water", "Cook spaghetti", "Prepare Bolognese sauce"],
          fasting: false,
          type: Category.DINNER,
          image: "https://example.com/spaghetti-bolognese.jpg",
          cook_id: "5f62e1c3e065bb001f34c421",
        },
      ];

      jest.spyOn(model, "find").mockResolvedValueOnce(mockRecipes);

      const result = await service.showAll();

      expect(model.find).toHaveBeenCalledWith();

      expect(result).toEqual(mockRecipes);
    });
  });

  describe("getSingleRecipe", () => {
    it("should return a real recipe when a valid ID is provided", async () => {
      const mockRecipeId = "5f62e1c3e065bb001f34c421";
      const realRecipeData: Recipe = {
        name: "Spaghetti Bolognese",
        description: "Classic Italian pasta dish",
        cookTime: 30,
        people: 4,
        ingredients: ["Spaghetti", "Tomato Sauce", "Ground Beef"],
        steps: ["Boil water", "Cook spaghetti", "Prepare Bolognese sauce"],
        fasting: false,
        type: Category.DINNER,
        image: "https://example.com/spaghetti-bolognese.jpg",
        cook_id: "someCookId",
      };

      jest.spyOn(model, "findById").mockResolvedValueOnce(realRecipeData);

      const result = await service.getSingleRecipe(mockRecipeId);
      console.log("Result:", result);

      expect(mockRecipeModel.findById).toHaveBeenCalledWith(mockRecipeId);

      expect(result).toEqual(realRecipeData);
    });

    it("should throw NotFoundException when an invalid ID is provided", async () => {
      const mockInvalidRecipeId = "invalidRecipeId";

      mockRecipeModel.findById.mockResolvedValueOnce(null);

      await expect(
        service.getSingleRecipe(mockInvalidRecipeId)
      ).rejects.toThrowError(NotFoundException);

      expect(mockRecipeModel.findById).toHaveBeenCalledWith(
        mockInvalidRecipeId
      );
    });
  });

  describe("getRecipesByCookId", () => {
    it("should return recipes when valid cook ID is provided", async () => {
      const mockCookId = "5f62e1c3e065bb001f34c421";
      const mockRecipes: Recipe[] = [
        {
          name: "Spaghetti Bolognese",
          description: "Classic Italian pasta dish",
          cookTime: 30,
          people: 4,
          ingredients: ["Spaghetti", "Tomato Sauce", "Ground Beef"],
          steps: ["Boil water", "Cook spaghetti", "Prepare Bolognese sauce"],
          fasting: false,
          type: Category.DINNER,
          image: "https://example.com/spaghetti-bolognese.jpg",
          cook_id: "5f62e1c3e065bb001f34c421",
        },
        {
          name: "Spaghetti Bolognese",
          description: "Classic Italian pasta dish",
          cookTime: 30,
          people: 4,
          ingredients: ["Spaghetti", "Tomato Sauce", "Ground Beef"],
          steps: ["Boil water", "Cook spaghetti", "Prepare Bolognese sauce"],
          fasting: false,
          type: Category.DINNER,
          image: "https://example.com/spaghetti-bolognese.jpg",
          cook_id: "5f62e1c3e065bb001f34c421",
        },
      ];

      jest.spyOn(model, "find").mockResolvedValueOnce(mockRecipes);

      const result = await service.getRecipesByCookId(mockCookId);
      console.log("result ", result);

      expect(mockRecipeModel.find).toHaveBeenCalledWith({
        cook_id: mockCookId,
      });

      expect(result).toEqual(mockRecipes);
    });

    it("should throw NotFoundException when no recipes are found for the cook ID", async () => {
      const mockCookId = "someCookId";

      jest.spyOn(model, "find").mockResolvedValueOnce([]);

      await expect(service.getRecipesByCookId(mockCookId)).rejects.toThrowError(
        NotFoundException
      );

      expect(model.find).toHaveBeenCalledWith({ cook_id: mockCookId });
    });
  });

  describe("getFasting", () => {
    it("should return recipes when fasting is true", async () => {
      const mockFasting = true;
      const mockRecipes: Recipe[] = [
        {
          name: "Healthy Salad",
          description: "A nutritious salad for fasting",
          cookTime: 15,
          people: 2,
          ingredients: ["Lettuce", "Tomatoes", "Cucumbers"],
          steps: ["Chop vegetables", "Mix ingredients", "Enjoy"],
          fasting: true,
          type: Category.LUNCH,
          image: "https://example.com/healthy-salad.jpg",
          cook_id: "someCookId",
        },
        {
          name: "Spaghetti Bolognese",
          description: "Classic Italian pasta dish",
          cookTime: 30,
          people: 4,
          ingredients: ["Spaghetti", "Tomato Sauce", "Ground Beef"],
          steps: ["Boil water", "Cook spaghetti", "Prepare Bolognese sauce"],
          fasting: false,
          type: Category.DINNER,
          image: "https://example.com/spaghetti-bolognese.jpg",
          cook_id: "5f62e1c3e065bb001f34c421",
        },
      ];

      jest.spyOn(model, "find").mockResolvedValueOnce(mockRecipes);

      const result = await service.getFasting(mockFasting);

      expect(model.find).toHaveBeenCalledWith({ fasting: mockFasting });

      expect(result).toEqual(mockRecipes);
    });

    it("should throw NotFoundException when no recipes found for fasting", async () => {
      const mockFasting = true;

      jest.spyOn(model, "find").mockResolvedValueOnce([]);

      await expect(service.getFasting(mockFasting)).rejects.toThrow(
        NotFoundException
      );

      expect(model.find).toHaveBeenCalledWith({ fasting: mockFasting });
    });
  });

  describe("getByType", () => {
    it("should return recipes of the specified type", async () => {
      const mockType = "DINNER";
      const mockRecipes = [
        {
          name: "Spaghetti Bolognese",
          description: "Classic Italian pasta dish",
          cookTime: 30,
          people: 4,
          ingredients: ["Spaghetti", "Tomato Sauce", "Ground Beef"],
          steps: ["Boil water", "Cook spaghetti", "Prepare Bolognese sauce"],
          fasting: false,
          type: Category.DINNER,
          image: "https://example.com/spaghetti-bolognese.jpg",
          cook_id: "5f62e1c3e065bb001f34c421",
        },
      ];

      jest.spyOn(model, "find").mockResolvedValueOnce(mockRecipes);

      const result = await service.getByType(mockType);

      expect(mockRecipeModel.find).toHaveBeenCalledWith({ type: mockType });

      expect(result).toEqual(mockRecipes);
    });

    it("should throw NotFoundException when no recipes found for the specified type", async () => {
      const mockInvalidType = "INVALID_TYPE";

      jest.spyOn(model, "find").mockResolvedValueOnce([]);

      await expect(service.getByType(mockInvalidType)).rejects.toThrowError(
        NotFoundException
      );

      expect(mockRecipeModel.find).toHaveBeenCalledWith({
        type: mockInvalidType,
      });
    });
  });

  describe("RecipeService", () => {
    describe("searchByTitle", () => {
      it("should return recipes with the specified title", async () => {
        const mockTitle = "Spaghetti Bolognese";
        const mockRecipes = [
          {
            name: "Spaghetti Bolognese",
            description: "Classic Italian pasta dish",
            cookTime: 30,
            people: 4,
            ingredients: ["Spaghetti", "Tomato Sauce", "Ground Beef"],
            steps: ["Boil water", "Cook spaghetti", "Prepare Bolognese sauce"],
            fasting: false,
            type: Category.DINNER,
            image: "https://example.com/spaghetti-bolognese.jpg",
            cook_id: "5f62e1c3e065bb001f34c421",
          },
        ];

        jest.spyOn(model, "find").mockResolvedValueOnce(mockRecipes);

        const result = await service.searchByTitle(mockTitle);

        expect(mockRecipeModel.find).toHaveBeenCalledWith({ title: mockTitle });

        expect(result).toEqual(mockRecipes);
      });

      it("should throw NotFoundException when no recipes found for the specified title", async () => {
        const mockInvalidTitle = "Non-existent Recipe";

        jest.spyOn(model, "find").mockResolvedValueOnce([]);

        await expect(
          service.searchByTitle(mockInvalidTitle)
        ).rejects.toThrowError(NotFoundException);

        expect(mockRecipeModel.find).toHaveBeenCalledWith({
          title: mockInvalidTitle,
        });
      });
    });
  });

  describe("RecipeService", () => {
    describe("updateById", () => {
      it("should update the recipe with the specified ID", async () => {
        const mockRecipeId = "5f62e1c3e065bb001f34c421";
        const updatedRecipeData: Recipe = {
          name: "Spaghetti Bolognese",
          description: "Classic Italian pasta dish",
          cookTime: 30,
          people: 4,
          ingredients: ["Spaghetti", "Tomato Sauce", "Ground Beef"],
          steps: ["Boil water", "Cook spaghetti", "Prepare Bolognese sauce"],
          fasting: false,
          type: Category.DINNER,
          image: "https://example.com/spaghetti-bolognese.jpg",
          cook_id: "5f62e1c3e065bb001f34c421",
        };

        jest
          .spyOn(model, "findByIdAndUpdate")
          .mockResolvedValueOnce(updatedRecipeData);

        const result = await service.updateById(
          mockRecipeId,
          updatedRecipeData
        );

        expect(mockRecipeModel.findByIdAndUpdate).toHaveBeenCalledWith(
          mockRecipeId,
          updatedRecipeData,
          { new: true, runValidators: true }
        );

        expect(result).toEqual(updatedRecipeData);
      });

      it("should throw NotFoundException when no recipe found for the specified ID", async () => {
        const mockInvalidRecipeId = "invalidRecipeId";
        const mockUpdatedRecipeData: Recipe = {
          name: "Spaghetti Bolognese",
          description: "Classic Italian pasta dish",
          cookTime: 30,
          people: 4,
          ingredients: ["Spaghetti", "Tomato Sauce", "Ground Beef"],
          steps: ["Boil water", "Cook spaghetti", "Prepare Bolognese sauce"],
          fasting: false,
          type: Category.DINNER,
          image: "https://example.com/spaghetti-bolognese.jpg",
          cook_id: "5f62e1c3e065bb001f34c421",
        };

        jest.spyOn(model, "findByIdAndUpdate").mockResolvedValueOnce(null);

        await expect(
          service.updateById(mockInvalidRecipeId, mockUpdatedRecipeData)
        ).rejects.toThrowError(NotFoundException);

        expect(mockRecipeModel.findByIdAndUpdate).toHaveBeenCalledWith(
          mockInvalidRecipeId,
          mockUpdatedRecipeData,
          { new: true, runValidators: true }
        );
      });
    });
  });
});
