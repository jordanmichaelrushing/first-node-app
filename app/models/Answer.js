

module.exports = function(sequelize, DataTypes) {

	var Answer = sequelize.define('Answer', {
			content: DataTypes.STRING
		},
		{
			associate: function(models){
				Answer.belongsTo(models.User);
				Answer.belongsTo(models.Poll);
			}
		}
	);

	return Answer;
};
