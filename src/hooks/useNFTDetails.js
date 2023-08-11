import useProviderSigner from "contexts/useProviderSigner";

const useNFTDetails = () => {
  const { getObject } = useProviderSigner();
  const getNFTDetails = async (id) => {
    let result = {};
    try {
      const { data, error } = await getObject(id);
      // if (error) {
      //   return result;
      // }
      const {
        type,
        fields,
        owner: { AddressOwner, ObjectOwner },
      } = data;
      if (ObjectOwner) {
        const dataWrap = await getObject(ObjectOwner);
        const { data: details } = await getObject(
          dataWrap?.data?.owner?.ObjectOwner
        );
        if (!details) return result;
        const owner = details?.content?.fields?.list_on_sale?.fields?.owner;
        const price = details?.content?.fields?.list_on_sale?.fields?.price;

        return { id, owner, typeNFT: type, fields, isListed: true, price };
      }
      return {
        id,
        owner: AddressOwner,
        typeNFT: type,
        fields,
        isListed: false,
      };
    } catch (ex) {
      console.log(ex);
    }
    return result;
  };

  return { getNFTDetails };
};

export default useNFTDetails;
