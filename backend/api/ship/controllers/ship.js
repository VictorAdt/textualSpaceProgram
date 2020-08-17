const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
    /**
     * Create a record.
     *
     * @return {Object}
     */

    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            data.user = ctx.state.user.id;
            entity = await strapi.services.ship.create(data, { files });
        } else {
            ctx.request.body.user = ctx.state.user.id;
            entity = await strapi.services.ship.create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models.ship });
    },

    /**
   * Update a record.
   *
   * @return {Object}
   */

    async update(ctx) {
        const { id } = ctx.params;

        let entity;

        const [ship] = await strapi.services.ship.find({
            id: ctx.params.id,
            'user.id': ctx.state.user.id,
        });

        if (!ship) {
            return ctx.unuserized(`You can't update this entry`);
        }

        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            entity = await strapi.services.ship.update({ id }, data, {
                files,
            });
        } else {
            entity = await strapi.services.ship.update({ id }, ctx.request.body);
        }

        return sanitizeEntity(entity, { model: strapi.models.ship });
    },
}
