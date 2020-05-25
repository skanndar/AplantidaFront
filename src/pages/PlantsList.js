import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import PlantCard from "../components/PlantCard";
import { Row, Col, List } from "antd";
import FilterDrawer from "../components/FilterDrawer";

class PlantsList extends Component {
  state = {
    plants: [],
  };
  componentDidMount() {
    const { plants } = this.props.location.state;
    this.setState({ plants });
  }

  componentDidUpdate(prevProps) {
    const { plants: newPlants } = this.props.location.state;
    const { plants: oldPlants } = prevProps.location.state;

    if (newPlants !== oldPlants) {
      this.setState({ plants: newPlants });
    }
  }

  render() {
    const plants = this.state.plants;
    return (
      <div>
        <h1>Found {plants.length} plants</h1>
        <FilterDrawer/>
        <List
          className="site-card-wrapper"
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={plants}
          renderItem={(onePlant) => (
              <List.Item>
                <PlantCard {...onePlant} />
              </List.Item>
          )}
        />
      </div>
    );
  }
}

export default withAuth(PlantsList);
