import { RouteDefinition } from './RouteDefinition';

export const Route = (method = 'get', param = '', middleware = []): MethodDecorator => {

    // `target` equals our class, `propertyKey` equals our decorated method name
    return (target, propertyKey: string): void => {
        // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
        // To prevent any further validation simply set it to an empty array here.

        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }

        // Get the routes stored so far, extend it by the new route and re-set the metadata.
        const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;
        routes.push({
            method,
            param,
            middleware: [],
            action: propertyKey,
        });

        Reflect.defineMetadata('routes', routes, target.constructor);
    };
};