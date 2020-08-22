function test-schema {
    for book in $(find books | grep "\.xml$")
    do
        echo ""
        echo "[test schema] $book"
        if ! time jing -c schema/book.rnc $book
        then
            exit 1
        fi
    done
}
