import React, { useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type DictionaryWord = {
  id: string;
  word: string;
  definitions: string[];
  examples: string[];
  synonyms?: string[];
  antonyms?: string[];
};

export default function DictionaryScreen() {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const words = useMemo<DictionaryWord[]>(
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
    const query = search.trim().toLowerCase();
    if (!query) {
      return words;
    }

    return words.filter((word) =>
      [
        word.word,
        ...word.definitions,
        ...word.examples,
        ...(word.synonyms ?? []),
        ...(word.antonyms ?? []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [search, words]);

  const toggleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const renderBullets = (
    values: string[] | undefined,
    textStyle: StyleProp<TextStyle>
  ) =>
    (values ?? []).map((value, index) => (
      <View key={`${value}-${index}`} style={styles.bulletRow}>
        <Text style={styles.bullet}>•</Text>
        <Text style={textStyle}>{value}</Text>
      </View>
    ));

  const renderItem = ({ item }: { item: DictionaryWord }) => {
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

        {isOpen ? (
          <>
            <Text style={[styles.dictLabel, { marginTop: 10 }]}>ተመሳሳሊ</Text>
            {item.synonyms && item.synonyms.length > 0 ? (
              renderBullets(item.synonyms, styles.dictText)
            ) : (
              <Text style={styles.dictText}>—</Text>
            )}

            <Text style={[styles.dictLabel, { marginTop: 10 }]}>ተጻራሪ</Text>
            {item.antonyms && item.antonyms.length > 0 ? (
              renderBullets(item.antonyms, styles.dictText)
            ) : (
              <Text style={styles.dictText}>—</Text>
            )}
          </>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageBody}>
        <View style={styles.dictSearchRow}>
          <TextInput
            value={search}
            onChangeText={(value) => {
              setSearch(value);
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
          keyExtractor={(item) => item.id}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  pageBody: {
    flex: 1,
    padding: 20,
  },
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
