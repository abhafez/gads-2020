import _ from "lodash";
import React, { Component } from "react";
import {
  Container,
  Dropdown,
  Header,
  Icon,
  Image,
  Menu,
  Visibility,
} from "semantic-ui-react";
import Logo from "../assets/logo.png";
import Img2 from "../assets/img2.jpg";
import * as styles from "../constants/Styles";
import { Footer } from "../components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";

const LeftImage = ({ img }) => (
  <Image
    floated="left"
    size="medium"
    src={img}
    style={{ margin: "2em 2em 2em -4em" }}
  />
);

const RightImage = ({ img }) => (
  <Image
    floated="right"
    size="medium"
    src={img}
    style={{ margin: "2em -4em 2em 2em" }}
  />
);

const Paragraph = () => (
  <p>
    {[
      "neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, ",
      "accumsan porttitor, facilisis luctus, metus",
    ].join("")}
  </p>
);

export default class StickyLayout extends Component {
  state = {
    menuFixed: false,
    overlayFixed: false,
  };

  handleOverlayRef = (c) => {
    const { overlayRect } = this.state;

    if (!overlayRect) {
      this.setState({
        overlayRect: _.pick(c.getBoundingClientRect(), "height", "width"),
      });
    }
  };

  stickOverlay = () => this.setState({ overlayFixed: true });

  stickTopMenu = () => this.setState({ menuFixed: true });

  unStickOverlay = () => this.setState({ overlayFixed: false });

  unStickTopMenu = () => this.setState({ menuFixed: false });

  render() {
    const { menuFixed, overlayFixed, overlayRect } = this.state;

    const HomePage = (
      <Container text>
        {_.times(3, (i) => (
          <Paragraph key={i} />
        ))}

        <Visibility
          offset={80}
          once={false}
          onTopPassed={this.stickOverlay}
          onTopVisible={this.unStickOverlay}
          style={overlayFixed ? { ...styles.overlayStyle, ...overlayRect } : {}}
        />

        <div
          ref={this.handleOverlayRef}
          style={overlayFixed ? styles.fixedOverlayStyle : styles.overlayStyle}
        >
          <Menu
            icon="labeled"
            style={
              overlayFixed
                ? styles.fixedOverlayMenuStyle
                : styles.overlayMenuStyle
            }
            vertical
          >
            <a href="https://www.google.com">
              <Menu.Item>
                <Icon name="google" />
                Google
              </Menu.Item>
            </a>

            <a href="https://www.pluralsight.com">
              <Menu.Item>
                <Icon name="play circle" />
                Pluralsight
              </Menu.Item>
            </a>

            <a href="https://www.andela.com">
              <Menu.Item>
                <Icon name="adn" />
                Andela
              </Menu.Item>
            </a>
          </Menu>
        </div>

        {_.times(3, (i) => (
          <Paragraph key={i} />
        ))}
        <LeftImage img={Img2} />

        <Paragraph />
        <RightImage img={Img2} />

        <Paragraph />
        <RightImage />

        {_.times(2, (i) => (
          <Paragraph key={i} />
        ))}
      </Container>
    );
    return (
      <div>
        <Container text style={{ marginTop: "2em" }}>
          <Header as="h1">Learn Web Development</Header>
          <p>The best learning path</p>
        </Container>
        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <Menu
            borderless
            fixed={menuFixed ? "top" : undefined}
            style={menuFixed ? styles.fixedMenuStyle : styles.menuStyle}
          >
            <Container text>
              <Menu.Item>
                <Image size="mini" src={Logo} />
              </Menu.Item>
              <Menu.Item header>WebDev Mastering</Menu.Item>

              <Menu.Menu position="right">
                <Dropdown text="Dropdown" pointing className="link item">
                  <Dropdown.Menu>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Header Item</Dropdown.Header>
                    <Dropdown.Item>
                      <i className="dropdown icon" />
                      <span className="text">Submenu</span>
                      <Dropdown.Menu>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>
        <Router>
          <Route path="/home">
            {HomePage}
          </Route>
        </Router>
        <Footer />
      </div>
    );
  }
}
