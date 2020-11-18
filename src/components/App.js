import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  onAdoptPet = (id) => {
    const { pets } = this.state;
    pets.find((pet) => pet.id === id).isAdopted = true;
    this.setState({
      pets: pets,
    });
  };

  onChangeType = (type) => {
    this.setState({
      filters: {
        type: type,
      },
    });
  };

  onFindPetsClick = () => {
    const { type } = this.state.filters;
    const url = "/api/pets" + (type === "all" ? "" : `?type=${type}`);
    fetch(url)
      .then((resp) => resp.json())
      .then((pets) => this.setState({ pets: pets }));
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
