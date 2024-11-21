import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Type } from "../entity/Type"
import { Controller } from '../decorator/Controller';
import { Route } from "../decorator/Route"
import { authenticateToken, authorizeAccess } from "../middleware/auth";

@Controller('/type') // the base path is http://localhost:3000/type
export class TypeController {

    private typeRepository = AppDataSource.getRepository(Type)

    @Route('get') // IF the GET HTTP Request Method is used then run the action below
    async all(request: Request, response: Response, next: NextFunction) {
        return this.typeRepository.find()
    }

    @Route('get', '/:id') // IF a param is specified then the path is http://localhost:3000/type/1
    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const type = await this.typeRepository.findOne({
            where: { id }
        })

        if (!type) {
            response.statusCode = 404;
            next()
        }
        return type
    }

    @Route('post', '', [authenticateToken, authorizeAccess('write')]) // IF the POST HTTP Request Method is used then run the action below
    async save(request: Request, response: Response, next: NextFunction) {
        const { name, pokemon } = request.body;

        const type = Object.assign(new Type(), {
            name,
            pokemon
        })

        response.setStatusCode = 201
        return this.typeRepository.save(type)
    }

    @Route('delete', '/:id', [authenticateToken, authorizeAccess('admin')]) // IF the DELETE HTTP Request Method is used then run the action below
    async remove(request: Request, response: Response, next: NextFunction) {

        const id = parseInt(request.params.id);
        const typeToRemove = await this.typeRepository.findOne({
            where: { id }
        });

        response.statusCode = 200;

        if (!typeToRemove) {
            response.statusCode = 404;
            next(); // let index.ts catch the 404 error and reply with JSON
        }

        return this.typeRepository.remove(typeToRemove);
    }

    @Route('put', '/:id', [authenticateToken, authorizeAccess('admin')]) // If the PUT HTTP Request Method is used, then run the action below
    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const { name } = request.body; // Get updated data from the request body

        // Find the existing type by its ID
        const typeToUpdate = await this.typeRepository.findOne({
            where: { id }
        });

        if (!typeToUpdate) {
            response.statusCode = 404; // Not Found
            return next(); // Let index.ts handle the 404 error and reply with JSON
        }

        // Update the fields of the found type entity
        typeToUpdate.name = name || typeToUpdate.name;

        // Save the updated entity back to the database
        const updatedType = await this.typeRepository.save(typeToUpdate);

        response.statusCode = 200; // OK
        return response.json(updatedType); // Return the updated type as JSON
    }

}