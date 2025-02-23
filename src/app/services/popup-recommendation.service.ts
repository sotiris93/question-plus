import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupRecommendationService {

  words: string[] = [
    "apple", "banana", "cherry", "dragonfruit", "elephant", "flamingo", "galaxy", "horizon", "iceberg", "jigsaw",
    "kangaroo", "lantern", "mountain", "nebula", "octopus", "penguin", "quasar", "rainbow", "sunflower", "tornado",
    "umbrella", "volcano", "waterfall", "xylophone", "yacht", "zephyr", "apricot", "blueberry", "cactus", "dolphin",
    "emerald", "feather", "glacier", "hummingbird", "illusion", "jasmine", "koala", "lavender", "melody", "nectarine",
    "oasis", "paradise", "quartz", "riverbank", "stardust", "twilight", "universe", "velocity", "whisper", "xenon",
    "yesterday", "zircon", "acrobat", "bonfire", "constellation", "daffodil", "enchantment", "firefly", "gemstone",
    "harvest", "iridescent", "javelin", "kaleidoscope", "labyrinth", "mirage", "nightfall", "observatory", "panorama",
    "quest", "reflection", "silhouette", "tranquility", "utopia", "vortex", "wildfire", "xylitol", "yearning", "zenith",
    "archipelago", "beacon", "cascade", "dewdrop", "evergreen", "fragrance", "gossamer", "halcyon", "incandescent",
    "jubilation", "kindred", "luminous", "meadow", "nostalgia", "oceanic", "porcelain", "quiver", "renaissance",
    "serendipity", "tapestry", "undulate", "verdant", "wanderlust", "xenophobia", "youthful", "zestful"
  ];
  
  constructor() { }

  getWords(searchTerm: string): Observable<string[]> {
    const recommended = this.words.filter(word => word.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())).sort().slice(0,6);
    return of(recommended);
  }
}
