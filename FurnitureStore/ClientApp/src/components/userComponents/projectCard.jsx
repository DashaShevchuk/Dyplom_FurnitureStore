import React from "react";
import { Card } from "antd";
import { Typography, Button } from "antd";
import { useHistory } from "react-router-dom";
const { Meta } = Card;
const { Title } = Typography;

const ProjectCard = ({ project, category }) => {
  //console.log(project && project);
  const history = useHistory();
  const handleCategoryClick = () => {
    //console.log(category)
   // console.log(`/projects/${category}/${project && project.Id}`);
    history.push(`/projects/${category}/${project && project.Id}`);
    // window.location.reload();
  };
  return (
    <Card
    className="m-1"
    onClick={handleCategoryClick}
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <img
          src={project && project.ProjectImages[0]}
          style={{ height: 180 }}
        />
      }
    >
      <Meta title={project && project.Name} />
    </Card>
  );
};

export default ProjectCard;
