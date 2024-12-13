import { Button, Container, Group, Title } from "@mantine/core";
import Illustration from "./NotFound/Illustration";
import classes from "./NotFound/NotThingFound.module.css";

const NotFoundPage = () => {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <div className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </div>
          <Group justify="center">
            <Button size="md">Take me back to home page</Button>
          </Group>
        </div>
      </div>
    </Container>
  );
};

export default NotFoundPage;
