const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];

  const res = await fetch(`https://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!res.ok) {
    throw new Error("An error occurred while fetching the pet.");
  }
  return res.json();
};

export default fetchPet;
