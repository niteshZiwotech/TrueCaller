import * as React from "react";
import Header from "./Header";
import SearchMain from "./SearchMain";
import BulkSearch from "./BulkSearch";

const Home = () => {
  return (
    <div style={{ flexGrow: 1 }}>
      <Header />
      <BulkSearch/>
      <SearchMain />
    </div>
  );
};

export default Home;
