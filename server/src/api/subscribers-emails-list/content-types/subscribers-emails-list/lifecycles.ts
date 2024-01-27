module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      await strapi.plugins['email'].services.email.send({
        to: "gran7777777@gmail.com",
        from: "mkoval338@gmail.com",
        subject: "You have a new subscriber on the site",
        text: `A person with mail ${result} subscribed to you`,///.email
      });
    } catch (err) {
      console.log(err);
    }
  },
};
