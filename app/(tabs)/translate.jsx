import React, { useMemo, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";

const LIGHT_THEME = {
  background: "#ffffff",
  surface: "#f8fafc",
  surfaceStrong: "#ffffff",
  border: "#d1d5db",
  text: "#111827",
  muted: "#667085",
  button: "#2563eb",
  buttonText: "#ffffff",
};

const DARK_THEME = {
  background: "#020617",
  surface: "#0b1220",
  surfaceStrong: "#0f172a",
  border: "#334155",
  text: "#f8fafc",
  muted: "#94a3b8",
  button: "#3b82f6",
  buttonText: "#f8fafc",
};

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
    palette,
    textColor,
  } = props;

  const items = React.Children.toArray(props.children).map((child) => ({
    label: child.props.label,
    value: child.props.value,
  }));

  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const triggerRef = useRef(null);
  const [dropdownFrame, setDropdownFrame] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const filtered = disableSearch
    ? items
    : items.filter((item) =>
        item.label.toLowerCase().includes(searchText.toLowerCase())
      );

  const selectedItem = items.find((item) => item.value === selectedValue);
  const closeDropdown = () => {
    setIsOpen(false);
    setSearchText("");
  };
  const openDropdown = () => {
    if (!triggerRef.current) {
      setIsOpen(true);
      return;
    }
    triggerRef.current.measureInWindow((x, y, width, height) => {
      setDropdownFrame({ x, y, width, height });
      setIsOpen(true);
    });
  };

  return (
    <View style={{ marginBottom: 5 }}>
      <View ref={triggerRef} collapsable={false}>
        <TouchableOpacity
          onPress={openDropdown}
          style={[
            style,
            {
              height: 45,
              backgroundColor: palette.surface,
              borderWidth: 1,
              borderColor: palette.border,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 12,
            },
          ]}
          activeOpacity={0.9}>
          <Text style={[itemStyle, { textAlign: "center" }]}>
            {selectedItem ? selectedItem.label : placeholder || "Select an option"}
          </Text>
        </TouchableOpacity>
      </View>

      {isOpen && (
        <Modal transparent visible animationType="none" onRequestClose={closeDropdown}>
          <Pressable style={styles.dropdownBackdrop} onPress={closeDropdown} />
          <View
            style={{
              position: "absolute",
              top: dropdownFrame.y + dropdownFrame.height + 6,
              left: dropdownFrame.x,
              width: dropdownFrame.width,
              zIndex: 1000,
              backgroundColor: palette.surfaceStrong,
              borderWidth: 1,
              borderColor: palette.border,
              borderRadius: 20,
              maxHeight: 260,
              padding: 8,
            }}>
            {!disableSearch && (
              <TextInput
                placeholder="ድለዩ..."
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
                style={{
                  height: 45,
                  borderWidth: 1,
                  borderColor: palette.border,
                  borderRadius: 20,
                  color: textColor,
                  paddingHorizontal: 12,
                  textAlignVertical: "center",
                  textAlign: "left",
                }}
                placeholderTextColor={palette.muted}
                autoFocus
              />
            )}

            <FlatList
              data={filtered}
              keyExtractor={(item) => item.value.toString()}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onValueChange(item.value);
                    closeDropdown();
                  }}
                  style={{
                    height: 45,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "flex-start",
                    paddingHorizontal: 12,
                  }}>
                  <Text style={{ color: textColor, textAlign: "left" }}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};
const DropdownSearchItem = () => null;
DropdownSearchItem.displayName = "DropdownSearch.Item";
DropdownSearch.Item = DropdownSearchItem;
DropdownSearch.displayName = "DropdownSearch";

/* -----------------------------
   ToolsScreen
   ✅ Added:
   - LANGUAGES (all)
   - Auto detect option
   - Swap button
   - Offline fallback
------------------------------ */
export default function ToolsScreen() {
  const colorScheme = useColorScheme();
  const palette = colorScheme === "dark" ? DARK_THEME : LIGHT_THEME;

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
    <SafeAreaView style={[styles.container, { backgroundColor: palette.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}>
        <View style={styles.pageBody}>
          <View
            style={[
              styles.titlePill,
              {
                backgroundColor: palette.surface,
                borderColor: palette.border,
              },
            ]}>
            <Text style={[styles.titlePillText, { color: palette.text }]}>ትርጉም</Text>
          </View>

          <View style={styles.translatorContainer}>
              {/* FROM */}
              <DropdownSearch
                selectedValue={translatorFrom}
                style={styles.translatorPicker}
                itemStyle={{ color: palette.text, fontSize: 16 }}
                onValueChange={(itemValue) => {
                  setTranslatorFrom(itemValue);
                  setTranslatorInput("");
                  setTranslatorOutput("");
                }}
                placeholder="From"
                palette={palette}
                textColor={palette.text}
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
                style={[
                  styles.translatorInput,
                  {
                    borderColor: palette.border,
                    color: palette.text,
                    backgroundColor: palette.surfaceStrong,
                  },
                ]}
                placeholder="ኣብዚ ጽሓፉ"
                placeholderTextColor={palette.muted}
                value={translatorInput}
                onChangeText={setTranslatorInput}
                textAlignVertical="center"
              />

              {/* ✅ Swap button */}
              <TouchableOpacity
                onPress={handleSwap}
                activeOpacity={0.85}
                style={[
                  styles.swapButton,
                  { backgroundColor: palette.surface, borderColor: palette.border },
                ]}
              >
                <Text style={[styles.swapButtonText, { color: palette.text }]}>⇄</Text>
              </TouchableOpacity>

              {/* TO */}
              <DropdownSearch
                selectedValue={translatorTo}
                style={styles.translatorPicker}
                itemStyle={{ color: palette.text, fontSize: 16 }}
                onValueChange={(itemValue) => {
                  setTranslatorTo(itemValue);
                  setTranslatorOutput("");
                }}
                placeholder="To"
                palette={palette}
                textColor={palette.text}
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
                style={[
                  styles.translatorInput,
                  {
                    borderColor: palette.border,
                    color: palette.text,
                    backgroundColor: palette.surfaceStrong,
                  },
                ]}
                editable={false}
                value={translatorOutput}
                placeholder="ትርጉም ኣብዚ ክቕረብ እዩ"
                placeholderTextColor={palette.muted}
                textAlignVertical="center"
              />

              <TouchableOpacity
                style={[styles.translateButton, { backgroundColor: palette.button }]}
                onPress={handleTranslate}
              >
                <Text style={[styles.translateButtonText, { color: palette.buttonText }]}>ተርጉም</Text>
              </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* -----------------------------
   Styles (kept your originals + small swap style)
------------------------------ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },

  pageBody: {
    flex: 1,
    padding: 20,
  },
  dropdownBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  titlePill: {
    height: 45,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titlePillText: {
    fontSize: 16,
    fontWeight: "700",
  },

  translatorContainer: {
    marginTop: 10,
  },
  translatorPicker: {
    color: "#111827",
    marginBottom: 5,
    height: 45,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  translatorInput: {
    height: 45,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 0,
    marginBottom: 5,
    textAlignVertical: "center",
  },
  translateButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    borderRadius: 20,
    marginTop:20,
  },
  translateButtonText: {
    fontSize: 16,
  },

  // ✅ swap button styles
  swapButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    borderRadius: 20,
    marginVertical: 6,
    paddingVertical: 0,
    borderWidth: 1,
  },
  swapButtonText: {
    fontSize: 20,
    fontWeight: "900",
  },
});
