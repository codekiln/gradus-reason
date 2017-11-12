import * as React from "react";
import Link from "gatsby-link";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { menuItems } from "../layouts";
import {
  Button,
  Segment,
  Container,
  Grid,
  Header,
  Icon,
} from "semantic-ui-react";
import * as reasonLogo from "../images/reason_300.png";

interface IndexPageProps {
  location: {
    pathname: string;
  };
}

export default (props: IndexPageProps) =>
  <div>
    {/* Masthead */}
    <Segment vertical textAlign="center" className="masthead">
      <HeaderMenu
        Link={Link} pathname={props.location.pathname} items={menuItems}
      />
      <Container text>
        <Header as="h1">Gradus <img src={reasonLogo} alt="Reason"/></Header>
        <Header as="h2">Steps to learning Reason OCaml</Header>
        {/*<Button primary size="huge">Get started!</Button>*/}
      </Container>
    </Segment>

    {/* About the site */}
    <Segment vertical className="stripe" inverted>
      <Grid stackable verticalAlign="middle" className="container">
        <Grid.Row>
          <Grid.Column width="8">
            <Header inverted>Lorem ipsum</Header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Porro laudantium ad, quae, perspiciatis ipsa distinctio.
                </p>
            <Header inverted>Dolor sit amet</Header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Porro laudantium ad, quae, perspiciatis ipsa distinctio.
                </p>
          </Grid.Column>
          <Grid.Column width="6" floated="right">
            {/* TODO replace with a pretty GIF */}
            <Header inverted>Lorem ipsum</Header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Porro laudantium ad, quae, perspiciatis ipsa distinctio.
                </p>
            <Header inverted>Dolor sit amet</Header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Porro laudantium ad, quae, perspiciatis ipsa distinctio.
                </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    {/* Key features */}
    <Segment vertical className="stripe alternate feature">
      <Grid columns="3" textAlign="center" divided relaxed stackable className="container">
        <Grid.Row>
          <Grid.Column>
            <Header icon>
              <Icon name="wizard"></Icon>
              A kind of magic!
            </Header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptas eaque at quae cupiditate aspernatur quibusdam!
                  Distinctio quod non, harum dolorum earum molestias,
                  beatae expedita aliquam dolorem asperiores nemo amet quaerat.
                </p>
          </Grid.Column>
          <Grid.Column>
            <Header icon>
              <Icon name="wizard"></Icon>
              A kind of magic!
            </Header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptas eaque at quae cupiditate aspernatur quibusdam!
                  Distinctio quod non, harum dolorum earum molestias,
                  beatae expedita aliquam dolorem asperiores nemo amet quaerat.
                </p>
          </Grid.Column>
          <Grid.Column>
            <Header icon>
              <Icon name="wizard"></Icon>
              A kind of magic!
            </Header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptas eaque at quae cupiditate aspernatur quibusdam!
                  Distinctio quod non, harum dolorum earum molestias,
                  beatae expedita aliquam dolorem asperiores nemo amet quaerat.
                </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </div>;
