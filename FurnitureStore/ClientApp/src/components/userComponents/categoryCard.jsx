import React from "react";
import { Card } from "antd";
import { Typography, Button } from "antd";
import { useHistory } from "react-router-dom";
import "../../accests/css/categoryCardStyle.css";
const { Title } = Typography;

const CategoryCard = ({ cardKey, categoryName, categoryImagePath }) => {
  console.log(cardKey, categoryName, categoryImagePath);
  const history = useHistory();
  const handleCategoryClick = (categoryName) => {
    history.push(`/projects/${categoryName}`);
    // window.location.reload();
  };
  return (
    <Card
      className="card"
      hoverable
      style={{ backgroundImage: `url(${categoryImagePath})` }}
      cover={<div className="card-cover" />}
    >
      <div className="card-body">
        <Title className="card-text" level={3}>
          {categoryName}
        </Title>
        <Button ghost className="show-more-btn" onClick={() => handleCategoryClick(categoryName)}>Дізнатись більше</Button>
      </div>
    </Card>
  );
};

export default CategoryCard;
