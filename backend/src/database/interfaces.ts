export interface CountryAPI {
  name: string;
  alpha3Code: string;
  alpha2Code: string;
  region: string;
  capital: string;
}

export interface imageDataFromAPI {
  pageid: number;
  title: string;
  imageinfo: {
    url: string;
    extmetadata: {
      ImageDescription?: {
        value: string;
      };
      LicenseShortName?: {
        value: string;
      };
      LicenseUrl?: {
        value: string;
      };
      Artist?: {
        value: string;
      };
    };
  }[];
}

export interface Country {
  id: number;
  name: string;
  alpha3code: string;
  alpha2code: string;
  region: string;
  capital: string;
  likes: number;
}

export interface CountriesQueryParams {
  region?: any;
  limit?: number;
  mostPopular?: boolean;
}
