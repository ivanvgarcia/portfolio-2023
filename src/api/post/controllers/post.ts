const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  // Query by slug
  async findOne(ctx) {
    // thanks to the custom route we have now a slug variable
    // instead of the default id
    const { slug } = ctx.params;
    const entity = await strapi.db.query("api::post.post").findOne({
      where: { slug },
      populate: ["cover"],
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
