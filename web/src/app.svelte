<script>
  import page from "page"
  import index from "./pages/index.svelte"
  import book from "./pages/book.svelte"

  let main
  let params

  const use = (component) => {
    main = component
  }

  page("/", () => use(index))
  page(
    "/:book",
    (ctx, next) => {
      params = ctx.params
      next()
    },
    () => use(book)
  )

  page.start()
</script>

<svelte:component this="{main}" {params} />
