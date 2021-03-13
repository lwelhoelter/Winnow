const Sequelize = require('sequelize');
const db = require('./database');
const {Op} = Sequelize;

const List = db.define('list', {});

module.exports = List;

List.findOrCreateList = function (user1Id, user2Id) {
  return List.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id],
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id],
      },
    },
    include: [db.models.task],
    order: [[db.models.task, 'createdAt', 'DESC']],
  }).then((list) => {
    if (list) {
      return list;
    } else {
      return List.create(
        {
          user1Id: user1Id,
          user2Id: user2Id,
        },
        {
          include: [db.models.task],
          order: [[db.models.task, 'createdAt', 'DESC']],
        },
      );
    }
  });
};
