import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Pokemon } from "../entity/Pokemon"
import { Controller } from '../decorator/Controller';
import { Route } from "../decorator/Route"
import { authenticateToken, authorizeAccess } from '../middleware/auth';

@Controller('/pokemon') // the base path is http://localhost:3000/pokemon
export class PokemonController {

    private pokemonRepository = AppDataSource.getRepository(Pokemon)

    @Route('get') // IF the GET HTTP Request Method is used then run the action below
    async all(request: Request, response: Response, next: NextFunction) {
        return this.pokemonRepository.find()
    }

    @Route('get', '/:id') // IF a param is specified then the path is http://localhost:3000/pokemon/1
    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const pokemon = await this.pokemonRepository.findOne({
            where: { id }
        })

        if (!pokemon) {
            response.statusCode = 404;
            next()
        }

        return pokemon
    }

    @Route('post', '', [authenticateToken, authorizeAccess('write')]) // IF the POST HTTP Request Method is used then run the action below
    async save(request: Request, response: Response, next: NextFunction) {

        const { name, level, type } = request.body;

        const pokemon = Object.assign(new Pokemon(), {
            name,
            level,
            type
        })

        response.setStatusCode = 201
        return this.pokemonRepository.save(pokemon)
    }

    @Route('delete', '/:id', [authenticateToken, authorizeAccess('admin')]) // IF the DELETE HTTP Request Method is used then run the action below
    async remove(request: Request, response: Response, next: NextFunction) {

        const id = parseInt(request.params.id)

        const pokemonToRemove = await this.pokemonRepository.findOne({
            where: { id }
        });

        if (!pokemonToRemove) {
            response.statusCode = 404;
            next()
        }

        response.statusCode = 200; 
        return this.pokemonRepository.remove(pokemonToRemove);
    }

    @Route('put', '/:id', [authenticateToken, authorizeAccess('admin')]) // If the PUT HTTP Request Method is used, then run the action below
    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const { name, level, type } = request.body; // Get updated data from the request body

        // Find the existing type by its ID
        const typeToUpdate = await this.pokemonRepository.findOne({
            where: { id }
        });

        if (!typeToUpdate) {
            response.statusCode = 404; // Not Found
            return next(); // Let index.ts handle the 404 error and reply with JSON
        }

        // Update the fields of the found type entity
        typeToUpdate.name = name || typeToUpdate.name;
        typeToUpdate.level = level || typeToUpdate.level;
        typeToUpdate.type = type || typeToUpdate.type;

        // Save the updated entity back to the database
        const updatedType = await this.pokemonRepository.save(typeToUpdate);

        response.statusCode = 200; // OK
        return response.json(updatedType); // Return the updated type as JSON
    }

}