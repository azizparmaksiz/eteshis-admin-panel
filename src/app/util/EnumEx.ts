export class EnumEx {
  static getNamesAndValues<T extends number>(e: any) {
    return EnumEx.getNames(e).map(n => ({name: n, value: e[n] as T}));
  }

  static getNames(e: any) {
    return EnumEx.getObjValues(e).filter(v => typeof v === 'string') as string[];
  }

  static getValues<T extends number>(e: any) {
    return EnumEx.getObjValues(e).filter(v => typeof v === 'number') as T[];
  }

   static getObjValues(e: any): (number | string)[] {
    return Object.keys(e).map(k => e[k]);
  }


  static getDropDownArrayFromEnum(e: any): Array<any> {
    const prodTypes: any[] = [];

    const prodTypeEnumList = EnumEx.getNamesAndValues(e);

    prodTypeEnumList.forEach(pair => {
      const prodType = {'label': pair.name, 'value': pair.value.toString()};
      prodTypes.push(prodType);
    });

    return prodTypes;
  }
}
