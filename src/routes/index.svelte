<svelte:head>
  <title>ΔΙΑΛΟΓΟΣ</title>
</svelte:head>

<main>
  <h1>ΔΙΑΛΟΓΟΣ</h1>
  <img src="cute-dialog-with-circle-200px.png" alt="cute-dialog-with-circle" />

  <p>
    An online dialectic teaching system,
    <br />
    inspired by Socrates, Plato, George Pólya and Dan Friedman.
  </p>

  <br />

  <div class="book-list">
    List of dialogs:
    <ul>
      <li>
        <a href="book/the-little-typer">The Little Typer</a>
      </li>
      <li>
        <a href="book/principles-of-systems">Principles of Systems</a>
      </li>
    </ul>
  </div>
</main>

<style>
  main {
    height: 100vh;
    background: #f9dbd2;
    color: #333333;
    padding-left: 1em;
  }

  li {
    margin-left: 2em;
    padding-left: 0.5em;
    list-style-type: "❖";
  }
</style>
