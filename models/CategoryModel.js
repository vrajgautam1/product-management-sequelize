module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        "Category",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );

    // 🔁 Association
    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            foreignKey: "categoryId",
            onDelete: "CASCADE",
        });
    };

    return Category;
};
