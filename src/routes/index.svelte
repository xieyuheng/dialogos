<script>
  import li from "@the-little-books/little"

  const node = li.Node.parse_nodes(
    `<div class="frame"><p>abc</p><p>123</p></div>`
  )
</script>

<svelte:head>
  <title>The Little Books</title>
</svelte:head>

<pre>{JSON.stringify(node, null, 4)}</pre>
