import { createContext, useContext, useEffect, useState } from "react";
import ApiContext from "./ApiContext";

/**declas: declas,
 * 
    GET_decla: GET_decla,
    
    GET: GET,
    
    POST: POST,
    
    PUT: PUT,

    VERWERK: VERWERK, 
    
    DELETE: DELETE,
    
    boekstuks: boekstuks,
    
    GET_boekstuk: GET_boekstuk,
    
    POST_boekstuk: POST_boekstuk,
    
    PUT_boekstuk: PUT_boekstuk,
    
    DELETE_boekstuk: DELETE_boekstuk, */
const DeclaContext = createContext();
export default DeclaContext;

export const DeclaProvider = ({ children }) => {
  const { user, ApiRequest, ApiFileRequest } = useContext(ApiContext);
  const [declas, setDeclas] = useState();

  const GET = async () => {
    setDeclas([]);
    const { res, data } = await ApiRequest(`/api/decla/`);
    if (res.status === 200) {
      setDeclas(data);
    } else {
      console.log("Error fetching declas");
    }
  };
  const GET_decla = async (id) => {
    const { res, data } = await ApiRequest(`/api/decla/${id}`);
    if (res.status === 200) {
      return data;
    } else {
      console.log("Error fetching decla");
    }
  };
  const POST = async (decla) => {
    console.log(decla.event);
    const uploadData = new FormData();
    decla.owner && uploadData.append("owner", decla.owner);
    decla.event && uploadData.append("event", decla.event);
    decla.content && uploadData.append("content", decla.content);
    decla.total && uploadData.append("total", decla.total);
    decla.present && uploadData.append("present", decla.present);
    decla.reunist && uploadData.append("reunist", decla.reunist);
    decla.kmters && uploadData.append("kmters", decla.kmters);
    decla.boekstuk && uploadData.append("boekstuk", decla.boekstuk);
    decla.content_ficus &&
      uploadData.append("content_ficus", decla.content_ficus);
    uploadData.append("verwerkt", decla.verwerkt);
    decla.receipt &&
      uploadData.append("receipt", decla.receipt, decla.receipt.name);
    const { res, data } = await ApiFileRequest("/api/decla/", {
      method: "POST",
      body: uploadData,
    });
    if (res.status === 200) {
      setDeclas([...declas, data]);
    } else {
      console.log("Decla niet gemaakt");
    }
  };
  const PUT = async (decla) => {
    const uploadData = new FormData();
    decla.id && uploadData.append("id", decla.id);
    decla.event && uploadData.append("event", decla.event.id);
    decla.content && uploadData.append("content", decla.content);
    decla.total && uploadData.append("total", decla.total);
    decla.present && uploadData.append("present", decla.present);
    decla.reunist && uploadData.append("reunist", decla.reunist);
    decla.kmters && uploadData.append("kmters", decla.kmters);
    decla.boekstuk && uploadData.append("boekstuk", decla.boekstuk);
    decla.content_ficus &&
      uploadData.append("content_ficus", decla.content_ficus);
    uploadData.append("verwerkt", decla.verwerkt);
    decla.receipt &&
      uploadData.append("receipt", decla.receipt, decla.receipt.name);
    const { res, data } = await ApiFileRequest(`/api/decla/${decla.id}`, {
      method: "PUT",
      body: uploadData,
    });
    if (res.status === 200) {
      setDeclas(
        declas.map((decla_from_map) =>
          decla.id === decla_from_map.id ? data : decla_from_map
        )
      );
    } else {
      console.log("Decla not updated");
    }
  };
  const VERWERK = async (decla) => {
    const uploadData = new FormData();
    uploadData.append("verwerkt", decla.verwerkt);
    const { res, data } = await ApiFileRequest(`/api/decla/${decla.id}`, {
      method: "PUT",
      body: uploadData,
    });
    if (res.status === 200) {
      setDeclas(
        declas.map((decla_from_map) =>
          decla.id === decla_from_map.id ? data : decla_from_map
        )
      );
    } else {
      console.log("Decla not updated");
    }
  };
  const DELETE = async (decla) => {
    const { res } = await ApiRequest(`/api/decla/${decla.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.status !== 200) {
      console.log("Decla niet verwijdert ");
    }
  };
  const [boekstuks, setBoekstuks] = useState([]);
  const GET_boekstuk = async () => {
    setBoekstuks([]);
    const { res, data } = await ApiRequest("/api/boekstuken/");
    if (res.status === 200) {
      setBoekstuks(data);
    } else {
      console.log("Error getting boekstuks");
    }
    return data;
  };
  async function POST_boekstuk(boekstuk) {
    const { res, data } = await ApiRequest("/api/boekstuken/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(boekstuk),
    });
    if (res.status === 200) {
      setBoekstuks([...boekstuks, data]);
    } else {
      console.log("Boekstuk niet aangemakt");
    }
    return data;
  }
  async function PUT_boekstuk(boekstuk) {
    const { res, data } = await ApiRequest(`/api/boekstuken/${boekstuk.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(boekstuk),
    });
    if (res.status === 200) {
      setBoekstuks(
        boekstuks.map((boekstuk_from_map) =>
          boekstuk.id === boekstuk_from_map.id ? data : boekstuk_from_map
        )
      );
    } else {
      console.log("Boekstuk niet aangemakt");
    }
  }
  async function DELETE_boekstuk(boekstuk) {
    const { res } = await ApiRequest(`/api/boekstuken/${boekstuk.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.status !== 200) {
      console.log("Boekstuk niet verwijdert");
    }
  }

  useEffect(() => {
    async function lambda() {
      await GET();
      await GET_boekstuk();
    }
    if (user) {
      lambda();
    }
    // eslint-disable-next-line
  }, [user]);

  const data = {
    declas: declas,
    GET_decla: GET_decla,
    GET: GET,
    POST: POST,
    VERWERK: VERWERK,
    PUT: PUT,
    DELETE: DELETE,
    boekstuks: boekstuks,
    GET_boekstuk: GET_boekstuk,
    POST_boekstuk: POST_boekstuk,
    PUT_boekstuk: PUT_boekstuk,
    DELETE_boekstuk: DELETE_boekstuk,
  };
  return <DeclaContext.Provider value={data}>{children}</DeclaContext.Provider>;
};
