import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* -----------------------------
   DropdownSearch (same as your original)
------------------------------ */
const DropdownSearch = (props) => {
  const {
    selectedValue,
    onValueChange,
    style,
    itemStyle,
    placeholder,
    disableSearch,
  } = props;

  const items = React.Children.toArray(props.children).map((child) => ({
    label: child.props.label,
    value: child.props.value,
  }));

  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filtered = disableSearch
    ? items
    : items.filter((item) =>
        item.label.toLowerCase().includes(searchText.toLowerCase())
      );

  const selectedItem = items.find((item) => item.value === selectedValue);

  return (
    <View style={{ marginBottom: 5 }}>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={[
          style,
          {
            padding: 10,
            backgroundColor: "#f2f2f7",
            borderRadius: 5,
          },
        ]}
        activeOpacity={0.9}
      >
        <Text style={[itemStyle, { textAlign: "center" }]}>
          {selectedItem ? selectedItem.label : placeholder || "Select an option"}
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <View
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: "#fff",
            maxHeight: 150,
          }}
        >
          {!disableSearch && (
            <TextInput
              placeholder="ድለዩ..."
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              style={{
                borderBottomWidth: 1,
                borderColor: "#ccc",
                padding: 8,
              }}
              autoFocus
            />
          )}

          <FlatList
            data={filtered}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onValueChange(item.value);
                  setIsOpen(false);
                  setSearchText("");
                }}
                style={{ padding: 10 }}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};
DropdownSearch.Item = () => null;

/* -----------------------------
   Calculator (original)
------------------------------ */
const Calculator = () => {
  const [display, setDisplay] = useState("");

  const handlePress = (value) => {
    if (value === "C") {
      setDisplay("");
    } else if (value === "=") {
      try {
        // eslint-disable-next-line no-eval
        const result = eval(display);
        setDisplay(result.toString());
      } catch (e) {
        setDisplay("Error");
      }
    } else {
      setDisplay(display + value);
    }
  };

  const buttons = [
    ["C", "/", "*", "Del"],
    ["7", "8", "9", "-"],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "="],
    ["0", ".", "", ""],
  ];

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          backgroundColor: "#000",
          width: "90%",
          padding: 20,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 32, color: "#fff", textAlign: "right" }}>
          {display}
        </Text>
      </View>

      <View style={{ width: "90%" }}>
        {buttons.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            {row.map((btn, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                style={{
                  flex: 1,
                  margin: 5,
                  backgroundColor: "#333",
                  padding: 20,
                  borderRadius: 10,
                  alignItems: "center",
                }}
                onPress={() => {
                  if (btn === "Del") {
                    setDisplay(display.slice(0, -1));
                  } else if (btn !== "") {
                    handlePress(btn);
                  }
                }}
              >
                <Text style={{ fontSize: 24, color: "#fff" }}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

/* -----------------------------
   CheckersGame stub
------------------------------ */
const CheckersGame = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ዳማ ኣብ ቀረባ እዋን ክለጠፍ እዩ</Text>
    </View>
  );
};

/* -----------------------------
   Dictionary (unchanged)
------------------------------ */
const Dictionary = () => {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState(null);

  const WORDS = useMemo(
    () => [
      {
        id: "1",
        word: "ሰላም",
        definitions: [
          "ምስ ሰብ ክትራኸብ ከለኻ እትጥቀመሉ ሰላምታ",
          "ጸቕጢ ከም ዘይብልካ ንምግላጽ ክትጥቀመሉ ትኽእል ኢኻ",
        ],
        examples: ["ሰላም ከመይ ኣለኻ", "ሰላም ኢና ዘለና"],
        synonyms: ["ሰላማዊ", "ዕርቂ"],
        antonyms: ["ጦርነት", "ዘይሰላም", "ባእሲ"],
      },
        {
        id: "2",
        word: "ሰላም",
        definitions: [
          "ምስ ሰብ ክትራኸብ ከለኻ እትጥቀመሉ ሰላምታ",
          "ጸቕጢ ከም ዘይብልካ ንምግላጽ ክትጥቀመሉ ትኽእል ኢኻ",
        ],
        examples: ["ሰላም ከመይ ኣለኻ", "ሰላም ኢና ዘለና"],
        synonyms: ["ሰላማዊ", "ዕርቂ"],
        antonyms: ["ጦርነት", "ዘይሰላም", "ባእሲ"],
      },
      {
        id: "3",
        word: "ትምህርቲ",
        definitions: ["Education; learning or teaching.", "Training or study."],
        examples: ["ትምህርቲ ንህይወት ኣለዎ ኣገዳሲ ተሳትፎ።"],
        synonyms: ["ስልጠና", "ምምሃር"],
        antonyms: ["ድንቁርና"],
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return WORDS;
    return WORDS.filter((w) =>
      [
        w.word,
        ...w.definitions,
        ...w.examples,
        ...(w.synonyms || []),
        ...(w.antonyms || []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [search, WORDS]);

  const toggleOpen = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const renderBullets = (arr, textStyle) =>
    (arr || []).map((t, idx) => (
      <View key={idx} style={styles.bulletRow}>
        <Text style={styles.bullet}>•</Text>
        <Text style={textStyle}>{t}</Text>
      </View>
    ));

  const renderItem = ({ item }) => {
    const isOpen = openId === item.id;

    return (
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={() => toggleOpen(item.id)}
        style={styles.dictCard}
      >
        <View style={styles.dictHeaderRow}>
          <Text style={styles.dictWord}>{item.word}</Text>
          <Text style={styles.dictChevron}>{isOpen ? "▲" : "▼"}</Text>
        </View>

        <Text style={styles.dictLabel}>ትርጉም</Text>
        {renderBullets(item.definitions, styles.dictText)}

        <Text style={[styles.dictLabel, { marginTop: 8 }]}>ኣብነት</Text>
        {renderBullets(item.examples, styles.dictExample)}

        {isOpen && (
          <>
            <Text style={[styles.dictLabel, { marginTop: 10 }]}>ተመሳሳሊ</Text>
            {item.synonyms && item.synonyms.length ? (
              renderBullets(item.synonyms, styles.dictText)
            ) : (
              <Text style={styles.dictText}>—</Text>
            )}

            <Text style={[styles.dictLabel, { marginTop: 10 }]}>ተጻራሪ</Text>
            {item.antonyms && item.antonyms.length ? (
              renderBullets(item.antonyms, styles.dictText)
            ) : (
              <Text style={styles.dictText}>—</Text>
            )}
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.dictSearchRow}>
        <TextInput
          value={search}
          onChangeText={(t) => {
            setSearch(t);
            setOpenId(null);
          }}
          placeholder="ቃል ድለዩ..."
          placeholderTextColor="#999"
          style={styles.dictSearchInput}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {search.length > 0 ? (
          <TouchableOpacity
            onPress={() => {
              setSearch("");
              setOpenId(null);
            }}
            style={styles.dictClearBtn}
          >
            <Text style={styles.dictClearText}>ምጽራይ</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 18 }}
        ListEmptyComponent={
          <View style={{ paddingTop: 30, alignItems: "center" }}>
            <Text style={{ color: "#666" }}>No matches.</Text>
          </View>
        }
      />
    </View>
  );
};

/* -----------------------------
   ToolsScreen
   ✅ Added:
   - LANGUAGES (all)
   - Auto detect option
   - Swap button
   - Offline fallback
------------------------------ */
export default function ToolsScreen() {
  const [selectedChatOption, setSelectedChatOption] = useState("translator");

  // Translator
  const [translatorInput, setTranslatorInput] = useState("");
  const [translatorOutput, setTranslatorOutput] = useState("");
  const [translatorFrom, setTranslatorFrom] = useState("auto"); // ✅ default auto
  const [translatorTo, setTranslatorTo] = useState("en");

  // ✅ All Google Translate languages (common names + official codes)
  const LANGUAGES = useMemo(
    () => [
      { label: "ብራሱ ይለልይ", value: "auto" },

      { label: "ኣፍሪካንስ", value: "af" },
      { label: "ኣልባንያኛ", value: "sq" },
      { label: "ኣማርኛ", value: "am" },
      { label: "ዓረብኛ", value: "ar" },
      { label: "ኣርመንያኛ", value: "hy" },
      { label: "ኣሳሚዝ", value: "as" },
      { label: "ኣይማራ", value: "ay" },
      { label: "ኣዘርባይጃንኛ", value: "az" },

      { label: "ባምባራ", value: "bm" },
      { label: "ባስክ", value: "eu" },
      { label: "ቤላሩስኛ", value: "be" },
      { label: "ቤንጋሊ", value: "bn" },
      { label: "ቦጅፑሪ", value: "bho" },
      { label: "ቦስንያኛ", value: "bs" },
      { label: "ቡልጋሪኛ", value: "bg" },

      { label: "ካታላን", value: "ca" },
      { label: "ሴቡኣኖ", value: "ceb" },
      { label: "ቻይንኛ (Simplified)", value: "zh-CN" },
      { label: "ቻይንኛ (Traditional)", value: "zh-TW" },
      { label: "ኮርሲካን", value: "co" },
      { label: "ክሮኤሽያኛ", value: "hr" },
      { label: "ቼክኛ", value: "cs" },

      { label: "ዳኒሽ", value: "da" },
      { label: "ዲቬሂ", value: "dv" },
      { label: "ዶግሪ", value: "doi" },
      { label: "ኔዘርላንድኛ", value: "nl" },

      { label: "ኢንግሊሽ", value: "en" },
      { label: "ኤስፐራንቶ", value: "eo" },
      { label: "ኤስቶንያኛ", value: "et" },
      { label: "ኢዌ", value: "ee" },

      { label: "ፊሊፒንኛ", value: "fil" },
      { label: "ፊንላንድኛ", value: "fi" },
      { label: "ፈረንሳይኛ", value: "fr" },
      { label: "ፍሪዝያን", value: "fy" },

      { label: "ጋሊሲያን", value: "gl" },
      { label: "ጆርጂያን", value: "ka" },
      { label: "ጀርመንኛ", value: "de" },
      { label: "ግሪክኛ", value: "el" },
      { label: "ጓራኒ", value: "gn" },
      { label: "ጉጃራቲ", value: "gu" },

      { label: "ሀይቲያን ክሪኦል", value: "ht" },
      { label: "ሀውሳ", value: "ha" },
      { label: "ሀዋይያን", value: "haw" },
      { label: "ኢብራይስጥ", value: "iw" }, // google endpoint still accepts iw
      { label: "ሂንዲ", value: "hi" },
      { label: "ህሞንግ", value: "hmn" },
      { label: "ሃንጋሪኛ", value: "hu" },

      { label: "አይስላንድኛ", value: "is" },
      { label: "ኢግቦ", value: "ig" },
      { label: "ኢሎካኖ", value: "ilo" },
      { label: "ኢንዶኔዥያኛ", value: "id" },
      { label: "ኣይሪሽ", value: "ga" },
      { label: "ጣልያንኛ", value: "it" },

      { label: "ጃፓንኛ", value: "ja" },
      { label: "ጃቫንኛ", value: "jw" },

      { label: "ካናዳኛ", value: "kn" },
      { label: "ካዛክኛ", value: "kk" },
      { label: "ክመር", value: "km" },
      { label: "ክንያርዋንዳ", value: "rw" },
      { label: "ኮርያንኛ", value: "ko" },
      { label: "ክሪዮ", value: "kri" },
      { label: "ኩርዲኛ (Kurmanji)", value: "ku" },
      { label: "ኩርዲኛ (Sorani)", value: "ckb" },
      { label: "ኪርጊዝ", value: "ky" },

      { label: "ላኦ", value: "lo" },
      { label: "ላቲን", value: "la" },
      { label: "ላትቪያን", value: "lv" },
      { label: "ሊንጋላ", value: "ln" },
      { label: "ሊቱዌንያን", value: "lt" },
      { label: "ሉጋንዳ", value: "lg" },
      { label: "ሉክሰምበርግኛ", value: "lb" },

      { label: "ማሴዶንያን", value: "mk" },
      { label: "ማይቲሊ", value: "mai" },
      { label: "ማላጋሲ", value: "mg" },
      { label: "ማላይ", value: "ms" },
      { label: "ማላያላም", value: "ml" },
      { label: "ማልቲዝ", value: "mt" },
      { label: "ማኦሪ", value: "mi" },
      { label: "ማራቲ", value: "mr" },
      { label: "ሚዞ", value: "lus" },
      { label: "ሞንጎሊያን", value: "mn" },

      { label: "ኔፓሊ", value: "ne" },
      { label: "ኖርወይኛ", value: "no" },

      { label: "ኦዲያ", value: "or" },
      { label: "ኦሮምኛ", value: "om" },

      { label: "ፓሽቶ", value: "ps" },
      { label: "ፐርሺያኛ", value: "fa" },
      { label: "ፖላንድኛ", value: "pl" },
      { label: "ፖርቱጋልኛ", value: "pt" },
      { label: "ፓንጃቢ", value: "pa" },

      { label: "ክዌችዋ", value: "qu" },

      { label: "ሮማንኛ", value: "ro" },
      { label: "ራሻኛ", value: "ru" },

      { label: "ሳሞኣን", value: "sm" },
      { label: "ሳንስክሪት", value: "sa" },
      { label: "ስኮቲሽ ጌሊክ", value: "gd" },
      { label: "ሰፐዲ", value: "nso" },
      { label: "ሰርቢያን", value: "sr" },
      { label: "ሰሶቶ", value: "st" },
      { label: "ሾና", value: "sn" },
      { label: "ሲንዲ", value: "sd" },
      { label: "ሲንሃላ", value: "si" },
      { label: "ስሎቫክ", value: "sk" },
      { label: "ስሎቬንያን", value: "sl" },
      { label: "ሶማልኛ", value: "so" },
      { label: "ስፓኒሽ", value: "es" },
      { label: "ሱንዳንዝ", value: "su" },
      { label: "ስዋሂሊ", value: "sw" },
      { label: "ስዊድንኛ", value: "sv" },

      { label: "ታጋሎግ", value: "tl" },
      { label: "ታጂክ", value: "tg" },
      { label: "ታሚል", value: "ta" },
      { label: "ታታር", value: "tt" },
      { label: "ቴሉጉ", value: "te" },
      { label: "ታይ", value: "th" },
      { label: "ትግሪኛ", value: "ti" },
      { label: "ጾንጋ", value: "ts" },
      { label: "ቱርክኛ", value: "tr" },
      { label: "ቱርክመን", value: "tk" },
      { label: "ትዊ", value: "ak" },

      { label: "ዩክሬንኛ", value: "uk" },
      { label: "ኡርዱ", value: "ur" },
      { label: "ኡይጉር", value: "ug" },
      { label: "ኡዝበክ", value: "uz" },

      { label: "ቪየትናምኛ", value: "vi" },

      { label: "ዌልሽ", value: "cy" },
      { label: "ዞሳ", value: "xh" },

      { label: "ይዲሽ", value: "yi" },
      { label: "ዮሩባ", value: "yo" },

      { label: "ዙሉ", value: "zu" },
    ],
    []
  );

  const handleTranslate = async () => {
    if (!translatorInput.trim()) return;

    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${translatorFrom}&tl=${translatorTo}&dt=t&q=${encodeURIComponent(
          translatorInput
        )}`
      );

      const data = await response.json();
      const translatedText = data?.[0]?.map((item) => item?.[0]).join("") || "";
      setTranslatorOutput(translatedText);
    } catch (error) {
      // ✅ Offline fallback (no crash)
      setTranslatorOutput(
        "Offline / Network error. Connect to internet and try again."
      );
      console.error("Translation error:", error);
    }
  };

  // ✅ Swap button
  const handleSwap = () => {
    // if from is auto, swapping it into "to" doesn't make sense.
    // We'll treat it like: swap only if from is not auto; otherwise just swap languages normally.
    const nextFrom = translatorTo;
    const nextTo = translatorFrom === "auto" ? translatorTo : translatorFrom;

    setTranslatorFrom(nextFrom);
    setTranslatorTo(nextTo);

    // swap text too
    setTranslatorInput(translatorOutput);
    setTranslatorOutput(translatorInput);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageBody}>
        <DropdownSearch
          selectedValue={selectedChatOption}
          style={styles.picker}
          itemStyle={{ color: "#000", fontSize: 16 }}
          onValueChange={(itemValue) => setSelectedChatOption(itemValue)}
          placeholder="Select chat option"
        >
          <DropdownSearch.Item label="ትርጉም" value="translator" />
          <DropdownSearch.Item label="መዝገበ ቃላት" value="dictionary" />
          <DropdownSearch.Item label="ካልኩሌተር" value="calculator" />
          <DropdownSearch.Item label="ዳማ" value="dama" />
        </DropdownSearch>

        {selectedChatOption === "translator" && (
          <View style={styles.translatorContainer}>
            {/* FROM */}
            <DropdownSearch
              selectedValue={translatorFrom}
              style={styles.translatorPicker}
              itemStyle={{ color: "#000", fontSize: 16 }}
              onValueChange={(itemValue) => {
                setTranslatorFrom(itemValue);
                setTranslatorInput("");
                setTranslatorOutput("");
              }}
              placeholder="From"
            >
              {LANGUAGES.map((lang) => (
                <DropdownSearch.Item
                  key={lang.value}
                  label={lang.label}
                  value={lang.value}
                />
              ))}
            </DropdownSearch>

           

            <TextInput
              style={styles.translatorInput}
              placeholder="ኣብዚ ጽሓፉ"
              placeholderTextColor="#666"
              value={translatorInput}
              onChangeText={setTranslatorInput}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />

             {/* ✅ Swap button */}
            <TouchableOpacity
              onPress={handleSwap}
              activeOpacity={0.85}
              style={styles.swapButton}
            >
              <Text style={styles.swapButtonText}>⇄</Text>
            </TouchableOpacity>

            {/* TO */}
            <DropdownSearch
              selectedValue={translatorTo}
              style={styles.translatorPicker}
              itemStyle={{ color: "#000", fontSize: 16 }}
              onValueChange={(itemValue) => {
                setTranslatorTo(itemValue);
                setTranslatorOutput("");
              }}
              placeholder="To"
            >
              {/* ✅ For TO, we remove "auto" option */}
              {LANGUAGES.filter((l) => l.value !== "auto").map((lang) => (
                <DropdownSearch.Item
                  key={lang.value}
                  label={lang.label}
                  value={lang.value}
                />
              ))}
            </DropdownSearch>

            <TextInput
              style={styles.translatorInput}
              editable={false}
              value={translatorOutput}
              placeholder="ትርጉም ኣብዚ ክቕረብ እዩ"
              placeholderTextColor="#666"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={styles.translateButton}
              onPress={handleTranslate}
            >
              <Text style={styles.translateButtonText}>ተርጉም</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedChatOption === "calculator" && <Calculator />}
        {selectedChatOption === "dama" && <CheckersGame />}
        {selectedChatOption === "dictionary" && <Dictionary />}
      </View>
    </SafeAreaView>
  );
}

/* -----------------------------
   Styles (kept your originals + small swap style)
------------------------------ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  pageBody: {
    flex: 1,
    padding: 20,
  },

  picker: {
    color: "#000",
  },

  translatorContainer: {
    marginTop: 10,
  },
  translatorPicker: {
    color: "#000",
    marginBottom: 5,
  },
  translatorInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    color: "#000",
    textAlignVertical: "top",
  },
  translateButton: {
    backgroundColor: "#007aff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  translateButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  // ✅ swap button styles
  swapButton: {
    alignItems: "center",

    marginVertical: 6,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: "#f2f2f7",
    borderColor: "#ddd",
  },
  swapButtonText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111",
  },

  /* ---------- Dictionary styles ---------- */
  dictSearchRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 10 : 6,
    backgroundColor: "#fafafa",
    marginBottom: 10,
  },
  dictSearchInput: {
    flex: 1,
    color: "#111",
    fontSize: 16,
    paddingVertical: 6,
  },
  dictClearBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#eee",
    marginLeft: 8,
  },
  dictClearText: {
    color: "#111",
    fontSize: 12,
    fontWeight: "700",
  },
  dictCard: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  dictHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dictWord: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
  },
  dictChevron: {
    fontSize: 12,
    fontWeight: "900",
    color: "#666",
    paddingLeft: 10,
  },
  dictLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#444",
    marginBottom: 4,
  },
  dictText: {
    fontSize: 14,
    color: "#222",
    lineHeight: 20,
  },
  dictExample: {
    fontSize: 14,
    color: "#222",
    lineHeight: 20,
    fontStyle: "italic",
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  bullet: {
    width: 16,
    color: "#444",
    fontWeight: "900",
    lineHeight: 20,
  },
});
