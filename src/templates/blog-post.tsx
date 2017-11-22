import * as React from "react";
import Link from "gatsby-link";
import {Card, Comment, Container, Grid, Header, Image, Item, Label, Segment} from "semantic-ui-react";
import {ImageSharp, MarkdownRemark, MarkdownRemarkConnection} from "../graphql-types";
import BlogTitle from "../components/BlogTitle";
import {getPrefixedSrcSet, withPrefix} from "../gatsby-utils";
import Html from "../components/Html/Html";

interface BlogPostProps {
  data: {
    post: MarkdownRemark;
    recents: MarkdownRemarkConnection;
  };
}

export default (props: BlogPostProps) => {
  console.log(props.data.post);
  const {frontmatter, html, timeToRead} = props.data.post;
  const avatar = frontmatter.author.avatar.children[0] as ImageSharp;

  const tags = props.data.post.frontmatter.tags
    .map((tag) => <Label key={tag}><Link to={`/steps/tags/${tag}/`}>{tag}</Link></Label>);

  const recents = props.data.recents.edges
    .map(({node}) => {
      const recentAvatar = node.frontmatter.author.avatar.children[0] as ImageSharp;
      const recentCover = node.frontmatter.image.children[0] as ImageSharp;
      const avatarImage = (
        <Image inline spaced="right">
          <img src={withPrefix(recentAvatar.responsiveResolution.src)}
               srcSet={getPrefixedSrcSet(recentAvatar.responsiveResolution.srcSet)}/>
        </Image>);
      const extra = (
        <Comment.Group>
          <Comment>
            {avatarImage}
            <Comment.Content>
              <Comment.Author style={{fontWeight: 400}}>
                {frontmatter.author.id}
              </Comment.Author>
              <Comment.Metadata style={{margin: 0}}>
                {timeToRead} min read
              </Comment.Metadata>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      );

      const cardImage = (
        <Image>
          <img src={withPrefix(recentCover.responsiveResolution.src)}
               srcSet={getPrefixedSrcSet(recentCover.responsiveResolution.srcSet)}/>
        </Image>);
      return (
        <div key={node.fields.slug} style={{paddingBottom: "1em"}}>
          <Card as={Link}
                to={node.fields.slug}
                image={cardImage}
                header={node.frontmatter.title}
                extra={extra}
          />
        </div>
      );
    });

  const recentCover = frontmatter.image.children[0] as ImageSharp;
  const itemImg = (<img src={withPrefix(avatar.responsiveResolution.src)}
                        srcSet={getPrefixedSrcSet(avatar.responsiveResolution.srcSet)}/> );
  return (
    <Container>
      <BlogTitle/>
      <Segment vertical style={{border: "none"}}>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" shape="circular">{itemImg}</Item.Image>
            <Item.Content>
              <Item.Description>{frontmatter.author.id}</Item.Description>
              <Item.Meta>{frontmatter.author.bio}</Item.Meta>
              <Item.Extra>{frontmatter.updatedDate} - {timeToRead} min read</Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
        <Header as="h1">{frontmatter.title}</Header>
      </Segment>
      <Image fluid>
        <img
          src={withPrefix(recentCover.responsiveResolution.src)}
          srcSet={getPrefixedSrcSet(recentCover.responsiveResolution.srcSet)}
        />
      </Image>
      <Segment vertical
               style={{border: "none"}}>
        <Html content={html}/>
      </Segment>
      <Segment vertical>
        {tags}
      </Segment>
      <Segment vertical>
        <Grid padded centered>
          {recents}
        </Grid>
      </Segment>
    </Container>
  );
};

export const pageQuery = graphql`
    query TemplateBlogPost($slug: String!) {
        post: markdownRemark(fields: {slug: {eq: $slug}}) {
            html
            excerpt
            timeToRead
            fields {
                slug
            }
            frontmatter {
                tags
                author {
                    id
                    bio
                    twitter
                    avatar {
                        children {
                            ... on ImageSharp {
                                responsiveResolution(width: 80, height: 80, quality: 100) {
                                    src
                                    srcSet
                                }
                            }
                        }
                    }
                }
                title
                updatedDate(formatString: "MMM D, YYYY")
                image {
                    children {
                        ... on ImageSharp {
                            responsiveResolution(width: 900, height: 300, quality: 100) {
                                src
                                srcSet
                            }
                        }
                    }
                }
            }
        }
        recents: allMarkdownRemark(
            filter: {
                fields: {slug: {ne: $slug}}
                frontmatter: {draft: {ne: true}},
                fileAbsolutePath: {regex: "/steps/"},
            },
            sort: {order: DESC, fields: [frontmatter___updatedDate]},
            limit: 4
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    timeToRead
                    frontmatter {
                        title
                        image {
                            children {
                                ... on ImageSharp {
                                    responsiveResolution(width: 300, height: 100) {
                                        src
                                        srcSet
                                    }
                                }
                            }
                        }
                        author {
                            id
                            avatar {
                                children {
                                    ... on ImageSharp {
                                        responsiveResolution(width: 36, height: 36) {
                                            src
                                            srcSet
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
