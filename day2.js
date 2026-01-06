// const ids = [
//   "11-22",
//   "95-115",
//   "998-1012",
//   "1188511880-1188511890",
//   "222220-222224",
//   "1698522-1698528",
//   "446443-446449",
//   "38593856-38593862",
//   "565653-565659",
//   "824824821-824824827",
//   "2121212118-2121212124",
// ];

const ids = [
  "132454-182049",
  "42382932-42449104",
  "685933-804865",
  "5330496-5488118",
  "21-41",
  "289741-376488",
  "220191-245907",
  "49-70",
  "6438484-6636872",
  "2-20",
  "6666660113-6666682086",
  "173-267",
  "59559721-59667224",
  "307-390",
  "2672163-2807721",
  "658272-674230",
  "485679-647207",
  "429-552",
  "72678302-72815786",
  "881990-991937",
  "73-111",
  "416063-479542",
  "596-934",
  "32825-52204",
  "97951700-98000873",
  "18335-27985",
  "70203-100692",
  "8470-11844",
  "3687495840-3687599608",
  "4861-8174",
  "67476003-67593626",
  "2492-4717",
  "1442-2129",
  "102962-121710",
  "628612213-628649371",
  "1064602-1138912",
];

// ------------------------------------------------------------
// Function to check if a single ID is INVALID
// Definition of INVALID:
// The number string is made by repeating a smaller pattern
// Example:
// 121212 → invalid (pattern "12")
// 111 → invalid (pattern "1")
// 123 → valid
// ------------------------------------------------------------
function isInvalidId(id) {
  // Convert number to string for pattern analysis
  const s = id.toString();
  const n = s.length;

  // Single-digit numbers cannot repeat a smaller pattern
  if (n <= 1) return false;

  // LPS array (Longest Prefix which is also Suffix)
  // Used by KMP algorithm
  const lps = new Array(n).fill(0);

  // Length of the current longest prefix-suffix
  let len = 0;

  // Build LPS array
  for (let i = 1; i < n; ) {

    // If characters match, extend current prefix
    if (s[i] === s[len]) {
      lps[i++] = ++len;
    }

    // If mismatch and we have previous prefix info,
    // fall back using LPS table
    else if (len > 0) {
      len = lps[len - 1];
    }

    // No prefix possible, move forward
    else {
      i++;
    }
  }

  // Length of the repeating pattern
  // Example:
  // s = "121212" → lps[n-1] = 4 → patternLen = 6 - 4 = 2
  const patternLen = n - lps[n - 1];

  // Invalid if:
  // 1. There exists a repeating prefix (lps[n-1] > 0)
  // 2. The string length is divisible by the pattern length
  return lps[n - 1] > 0 && n % patternLen === 0;
}


// ------------------------------------------------------------
// Finds all invalid IDs between start and end (inclusive)
// ------------------------------------------------------------
function findInvalidIdsInRange(start, end) {
  const invalidIds = [];

  // Check every number in the range
  for (let id = start; id <= end; id++) {
    if (isInvalidId(id)) {
      invalidIds.push(id);
    }
  }

  return invalidIds;
}


// ------------------------------------------------------------
// Main execution logic
// ------------------------------------------------------------

let invalidIdSum = 0;

// Process each ID range
ids.forEach((id) => {

  // Split "start-end" into numeric values
  const [start, end] = id.split("-").map(Number);

  // Find invalid IDs in the given range
  const invalidIds = findInvalidIdsInRange(start, end);

  // Log invalid IDs and count
  console.log(invalidIds, invalidIds.length);

  // Add all invalid IDs to total sum
  invalidIds.forEach((num) => {
    invalidIdSum = invalidIdSum + num;
  });
});

// Print final sum of all invalid IDs
console.log(invalidIdSum);
