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
