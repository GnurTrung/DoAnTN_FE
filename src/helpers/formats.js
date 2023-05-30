export const formatSuiItem = ({ details: { owner, data }, status }) => {
    if (status === "Exists") {
        return {
            owner: owner.ObjectOwner || owner.AddressOwner,
            data: data.fields,
            id: data.fields.id.id,
            type: data.type,
            types: data.type.split("::"),
        };
    } else {
        return false;
    }
};