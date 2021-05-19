import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import CategoryList from '../components/category/CategoryList';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';
import SubCategoryList from '../components/subCategory/SubCategoryList';

const Home = () => {
  return (
    <>
      <div className="jumbotron text-danger text-center h1 font-weight-bold">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>
      <h4 className="p-3 mb-5 mt-5 display-4 text-center jumbotron">New Arrivals</h4>
      <NewArrivals />
      <h4 className="p-3 mb-5 mt-5 display-4 text-center jumbotron">Best Sellers</h4>
      <BestSellers />
      <h4 className="p-3 mb-5 mt-5 display-4 text-center jumbotron">Categories</h4>
      <CategoryList />
      <h4 className="p-3 mb-5 mt-5 display-4 text-center jumbotron">Sub Categories</h4>
      <SubCategoryList />
    </>
  );
}

export default Home;
