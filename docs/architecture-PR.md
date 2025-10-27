# Architecture explanation

## repo - productRepo repository
- What does this hook/service/repository do?<br/>
  Answer: The repository is responsible for the CRUD operations for product data
- How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns? <br/>
  Answer: the logic is for the CRUD for product data. After we implement this feature, if we change our data source from the test data to backend, just need to modify this layer. It's easier to maintenance.
- Where is this implementation made use of in the project and how?<br/>
  Answer: It's used in service layer. When service layer needs to modify the product data, it will call the CRUD functions in the repo.

## service - productService service
- What does this hook/service/repository do?<br/>
  Answer: The service is responsible for the business logic for product. This layer implementation is based on the product repo. For example, if we need to get products in wish list or of which the price is under certain value, we could implement the bussiness logic in this layer.
- How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns? <br/>
  Answer: by now I just implement a wish list product filtering logic in this layer. For the future iteration, if I want to filter the product in a price range, I will implement in this layers.
- Where is this implementation made use of in the project and how?<br/>
  Answer: It's used in the useProduct hook. The hook will call the service to bridge the data change between UI and backend.

## hook - useProduct hook
- What does this hook/service/repository do?<br/>
  Answer: this hook is responsible for bridging the data change between UI and backend.
- How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns? <br/>
  Answer: it allows user to save the product data change in backend, and re-render the product data accordingly.
- Where is this implementation made use of in the project and how?<br/>
  Answer: It's used in product component page. The page will interactive the product data with backend using this hook.