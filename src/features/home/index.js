import HiddenComponent from "../users/hidden-component";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <HiddenComponent>
        <div>
          Display if logged in!
        </div>
      </HiddenComponent>
    </div>
  );
}

export default Home;