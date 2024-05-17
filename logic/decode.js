import * as rsidDict from '../RSIDdict.json';

export const decode23andMe = (text) => {
    const lines = text.split('\n');
    var genotypeDict = {};
    lines.forEach(line => {
      if (line.startsWith('#')) return; // Skip comment lines
      const [rsid, , , genotype] = line.split('\t');
      if (rsid in rsidDict) {
        genotypeDict[rsidDict[rsid]] = genotype.slice(0, -1);
      }
    });

    rsidDict.consolidate.forEach(c => {
      genotypeDict = consolidate(genotypeDict, c.code, c.patterns);
    });
    
    return genotypeDict;
};

const consolidate = (dict, code, patterns) => {
    let i = 1;
    var comb = "";
    while ((code + '-' + i) in dict) {
        comb += dict[code + '-' + i];
        delete dict[code + '-' + i];
        i++;
    }

    console.log(comb in patterns);

    if (comb in patterns) {
        dict[code] = patterns[comb];
    }
    return dict;
}

export const decodeDNAco = (fileContents) => {
    return {};
};