import * as React from "react";
import Link from "gatsby-link";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import {menuItems} from "../layouts";
import {Button, Card, Container, Grid, Header, Image, Segment} from "semantic-ui-react";
import * as reasonWordLogo from "../images/reason_300.png";
import * as reasonIcon from "../images/icon_75.png";
import * as ocamlLogo from "../images/ocaml.svg";
import * as jsLogo from "../images/js_logo.svg";
import * as gradus1 from "../images/gradus_1.jpg";
import * as gradus2 from "../images/gradus_2.jpg";
import * as gradus3 from "../images/gradus_3.jpg";
import * as gradus5 from "../images/gradus_5.jpg";
import * as gradus6 from "../images/gradus_6.jpg";

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
        <Header as="h1">Gradus <img src={reasonWordLogo} alt="Reason"/></Header>
        <Header as="h2">Steps to learning Reason OCaml</Header>
        <Button primary size="huge"><Link to="/steps/">Get started!</Link></Button>
      </Container>
    </Segment>

    {/* About the site */}
    <Segment vertical className="stripe" inverted>
      <Container text>
        <Grid stackable verticalAlign="middle" className="container">
          <Grid.Row width="8">
            <Header inverted>
              <Image inline src={reasonIcon}
                     as="a" href="https://reasonml.github.io/" target="_blank" size="tiny" spaced="right"/>
              Why Reason?
            </Header>

            <p>
              As a strongly typed functional language, <a
              target="_blank" href="https://reasonml.github.io/">Reason</a> can decrease the number of tests
              needed to maintain correctness over the lifetime of the program.

              <a target="_blank" href="https://www.youtube.com/watch?v=L0xz-ILKsLE">&nbsp;
                Tests explain you what <em>remember</em> about your program;
                types tell you what you <em>forgot</em>.
              </a>
            </p>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width="7">
              <Header inverted>
                <Image inline src={ocamlLogo}
                       as="a" href="https://ocaml.org/" target="_blank" size="tiny" spaced="right"/>
                OCaml Rigor
              </Header>
              <p>
                Reason <a href="https://ocaml.org/" target="_blank">is OCaml</a>. It <a href="https://goo.gl/qxQCct">
                compiles to a fast native executable</a>, and yet (unlike C or C++) it is type-safe and
                garbage collected, making it possible to write provably correct code.
                Using <a href="https://mirage.io/">MiragOS</a> you can even compile your program down to a minimal
                operating system that runs on bare metal.
              </p>
            </Grid.Column>
            <Grid.Column width="7">
              <Header inverted>
                <Image inline src={jsLogo}
                       as="a" href="https://reasonml.github.io/guide/what-and-why" target="_blank" size="tiny"
                       spaced="right"/>
                JavaScript Community
              </Header>
              <p>
                As language that <a target="_blank" href="https://reasonml.github.io/guide/what-and-why">can both use
                and compile to human-readable Javascript</a>, Reason lets you leverage the npm ecosystem
                into into higher performance, correctness and portability outside of the node runtime.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>

    {/* Why Gradus? */}
    <Segment raised vertical clearing className="stripe feature">
      <Container>
        <Header as="h3">About <em>Gradus Reason</em></Header>
        <Card.Group stackable itemsPerRow="3">
          <Card>
            <Card.Content>
              <Card.Header>
                What is this site?
              </Card.Header>
              <Card.Description>
                <p>This site is a collection of steps for learning and using Reason.
                  The <Link to="/steps/">steps</Link> give practical examples that go beyond the
                  core <Link to="https://reasonml.github.io/guide/">Reason Guide</Link>.
                </p>
                <Image centered size="medium" src={gradus1}/>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>
                What does <em>Gradus Reason</em> mean?
              </Card.Header>
              <Card.Description>
                <p>
                  <em>Gradus</em> is the
                  latin word for "Steps." Many of the earliest textbooks were titled <a
                  href="https://en.wikipedia.org/wiki/Gradus_ad_Parnassum"><em>Gradus ad Parnassum</em></a>,
                  or "steps to Parnassus," a mountain region in Greece. These books provided a way
                  for scholars to <em>gradually</em> learn how to write Greek and Latin verse.
                </p>
                <Image centered size="small" src={gradus2}/>
                <Image centered size="small" src={gradus3}/>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>
                I'm learning Reason! May I contribute content?
              </Card.Header>
              <Card.Description>
                <p>
                  Please do! This project was started
                  with the intention of helping the community
                  document examples of how to do basic, useful
                  things with Reason.
                  Please submit a pull request to
                  the <a href="https://github.com/codekiln/gradus-reason">github
                  repo</a>.
                </p>
                <Image centered size="small" src={gradus6}/>
                <Image centered size="small" src={gradus5}/>
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>

    </Segment>
  </div>;
