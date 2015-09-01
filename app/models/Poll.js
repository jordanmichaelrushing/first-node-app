

module.exports = function(sequelize, DataTypes) {

  var Poll = sequelize.define('Poll', {
      title: DataTypes.STRING,
      question_one: DataTypes.STRING,
      question_two: DataTypes.STRING,
      question_three: DataTypes.STRING,
      question_four: DataTypes.STRING
    },
    {
      associate: function(models) {
        Poll.hasMany(models.Answer);
        Poll.belongsTo(models.User);
      }
    }
  );

  return Poll;
};
