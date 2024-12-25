import { LoadingOverlay, NativeSelect } from "@mantine/core";
import Showcase from "../../components/showcaseBanner/Showcase";
import useCourses from "../../hooks/course/useCourses";
import CourseItem from "./components/landingPage/CourseItem";
import FilterBar from "./components/landingPage/FilterBar";
import SearchBar from "./components/landingPage/SearchBar";
import { useState } from "react";
import CardSkeleton from "../../components/skeleton/CardSkeleton";
import useCategories from "../../hooks/category/useCategories";
import useStore from "../../store";

const HomePage = () => {
  const Categories = useCategories();
  const [categoryValue, setCategoryValue] = useState("");
  const [levelValue, setLevelValue] = useState("");
  const [isLoadin, setIsLoading] = useState(true);

  const { courseQuery } = useStore();
  const { data, error, isLoading } = useCourses();

  if (error) {
    console.log(error);
  }

  let categoriesArray: any = [];
  if (Categories.data?.data) {
    categoriesArray = Categories.data.data.map((i) => i.name);
    categoriesArray.unshift("All"); // Add an empty value at the start
  }

  return (
    <>
      {/* <!-- There is content-product for non side bar layout --> */}
      <div className="content-product">
        <Showcase />

        {/* <!-- Courses --> */}

        <div className="home-container">
          <div className="course-filter">
            <SearchBar />
            {/* <FilterBar /> */}
            <div className="filter-test">
              <NativeSelect
                value={categoryValue}
                onChange={(event) => {
                  setCategoryValue(event.currentTarget.value);
                  courseQuery.setCategory(event.currentTarget.value);
                }}
                size="lg"
                flex={1}
                label="Categories"
                data={categoriesArray}
              />
            </div>
            <div className="filter-test">
              <NativeSelect
                value={levelValue}
                onChange={(event) => {
                  setLevelValue(event.currentTarget.value);
                  courseQuery.setLevel(event.currentTarget.value);
                }}
                size="lg"
                flex={1}
                label="Level"
                data={["All", "Beginer", "Intermidiate", "Advanced"]}
              />
            </div>
            {/* <div className="filter">
              <label htmlFor="levels">Level</label>
              <select id="levels">
                <option value="beginer">Beginer</option>
                <option value="intermidiate">Intermidiate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div> */}
          </div>
          <div className="course-container">
            <div className="card_container">
              {!isLoading ? (
                data?.data.map((i) => <CourseItem course={i} key={i.id} />)
              ) : (
                <CardSkeleton amount={4} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
