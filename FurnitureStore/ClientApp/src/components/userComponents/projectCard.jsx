import React, { useState } from "react";
import { Card, Typography } from "antd";
import { useHistory } from "react-router-dom";
import ProjectDialog from "./projectDialog";
import "../../accests/css/projectCardStyle.css";

const { Meta } = Card;
const { Title } = Typography;

const ProjectCard = ({ project }) => {
  const [projectDialog, setProjectDialog] = useState(false);
  
  const projectDialogCloseClick = () => {
    setProjectDialog(false);
  };

  const projectDialogOpenClick = () => {
    setProjectDialog(true);
  };

  const ProjectDialogComponent = () => {
    return (
      <ProjectDialog
        isOpen={projectDialog}
        onClose={projectDialogCloseClick}
        project={project}
      />
    );
  };

  return (
    <>
      <Card
        className="card"
        onClick={projectDialogOpenClick}
        hoverable
        style={{
          width: 350,
          height: 350
        }}
        cover={<img src={project && project.ProjectImages[0]} style={{ height: 250 }} />}
      >
        <Meta title={project && project.Name} />
      </Card>
      {ProjectDialogComponent()}
    </>
  );
};

export default ProjectCard;
