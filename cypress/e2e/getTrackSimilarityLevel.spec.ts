import { getTrackSimilarityLevel } from "../../src/utils/playlist";

export interface Track {
  id: string;
  name: string;
  artists: Artist[];
}

export interface Artist {
  id: string;
}

const track1: Track = {
  "id": "3GfOAdcoc3X5GPiiXmpBjK",
  "name": "Song 2",
  "artists": [
    {
      "id": "7MhMgCo0Bl0Kukl93PZbYS",
    }
  ]
}

const track2: Track = {
  "id": "3GfOAdcoc3X5GPiiXmpBjK",
  "name": "Song 2",
  "artists": [
    {
      "id": "7MhMgCo0Bl0Kukl93PZbYS",
    }
  ]
}

const track3: Track = {
  "id": "8abc71c664995b3c",
  "name": "Song 2",
  "artists": [
    {
      "id": "7MhMgCo0Bl0Kukl93PZbYS",
    }
  ]
}

const track4: Track = {
  "id": "UL77YCNJ008662554255556608",
  "name": "Song 2",
  "artists": [
    {
      "id": "DX758CIE07114316998246400",
    },
    {
      "id": "7MhMgCo0Bl0Kukl93PZbYS",
    }
  ]
}

const track5: Track = {
  "id": "SJ705Q2M5116639628492800",
  "name": "Song 2",
  "artists": [
    {
      "id": "DF3871L50007277914653458432",
    },
  ]
}

const track6: Track = {
  "id": "d6ba98ab25d18d10584c",
  "name": "Song 3",
  "artists": [
    {
      "id": "76a655565b6f5fa5",
    },
  ]
}

// napsat testy pro funkci getTrackSimilarityLevel
describe("getTrackSimilarityLevel", () => {
  it("should return 4 if the tracks have the same id", () => {
    expect(getTrackSimilarityLevel(track1, track2)).to.equal(4);
  });

  it("should return 3 if the tracks have the same name and artists", () => {
    expect(getTrackSimilarityLevel(track1, track3)).to.equal(3);
  });

  it("should return 2 if the tracks have the same name and some artists", () => {
    expect(getTrackSimilarityLevel(track1, track4)).to.equal(2);
  });

  it("should return 1 if the tracks have the same name but different artists", () => {
    expect(getTrackSimilarityLevel(track1, track5)).to.equal(1);
  });

  it("should return 0 if the tracks have different names or one of them has null id", () => {
    expect(getTrackSimilarityLevel(track1, track6)).to.equal(0);
    expect(getTrackSimilarityLevel(track6, track4)).to.equal(0);
    expect(getTrackSimilarityLevel(track6, track3)).to.equal(0);
    expect(getTrackSimilarityLevel(track6, track5)).to.equal(0);
  });
});