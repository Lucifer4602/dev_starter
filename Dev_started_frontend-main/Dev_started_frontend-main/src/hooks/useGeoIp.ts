import { useEffect, useState } from "react";

export interface GeoIp {
  country_code_iso3: string;
  currency: string;
}

export const useGeoIp = () => {
  const [geoIp, setGeoIp] = useState<GeoIp | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGeoIp();
        setGeoIp(response);
        setError(null);
      } catch (err) {
        setError("Error fetching geo IP data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { geoIp, error, loading };
};

export const getGeoIp = async (): Promise<GeoIp> => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};
