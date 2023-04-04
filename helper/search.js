export const Search = (data, searchQuery) => {
    const searchedData = data.filter(e => {
        return e.username.includes(searchQuery);
    })

    return searchedData;
}