import React, { useState } from "react";
import {AsyncStorage, ScrollView, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {CheckBox} from "@rneui/themed";

const KVKKScreen = () => {
    const [isSelected, setIsSelected] = useState(false);
    const navigation = useNavigation();

    const clickHandler = () => {
        setIsSelected(!isSelected);
        AsyncStorage.setItem("isKVKKApproved", JSON.stringify(!isSelected))
            .then(() => {
                alert("Seçiminiz Kaydedildi");
                navigation.navigate("Kaydol");
            })
            .catch(error => console.log(error));
    }

    return(
        <ScrollView  style={styles.container}>
        <View>
            <Text style={styles.header}>Kişisel Verilerinin İşlenmesi Aydınlatma Metni</Text>
            <Text style={styles.text}>İşbu Aydınlatma Metni, Oceliler ve Dostları Kültür Yardımlaşma Derneği(“Veri İşleyen”),  tarafından, uygulamaya üye olan kullanıcıların (“Veri Sahibi”) kişisel verilerinin, Türkiye Cumhuriyeti Anayasası,  insan haklarına ilişkin ülkemizin tarafı olduğu uluslararası sözleşmeler, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) ve General Data Protection Regulation (“GDPR”) başta olmak üzere ilgili mevzuata ve Kişisel Verileri Koruma Kurulu kararlarına uygun olarak işlenmesi ve Veri Sahipleri’nin haklarını etkin şekilde kullanabilmesini sağlamak amacıyla hazırlanmıştır.
                İşlenen Kişisel Veriler
                Dernek, operasyonlarını devam ettirebilmek amacıyla hizmet sağlanması kapsamında Veri Sahiplerine ait aşağıda belirtilen kişisel verilerini işlemektedir:</Text>
            <Text style={styles.text}>•	Uygulama ziyaretleri, telefon ,e-posta, form doldurulması gibi kaynaklar üzerinden doğrudan ilgililerden toplanmaktadır.</Text>
            <Text style={styles.text}>•	Kimlik verileri (ad, soyad) başta olmak üzere; iletişim verileri (e-mail adresi ve telefon bilgileri), konum bilgisi, Kişisel Verilerin Korunması Kanunu kapsamında sözleşmenin kurulması/ifası, yasal yükümlülüklerin yerine getirilmesi ve meşru menfaatler doğrultusunda işlenmektedir.</Text>
            <Text style={styles.text}>Kişisel Veri Toplama Yöntemleri
            Kişisel verileriniz, uygulamayı ziyaretiniz esnasında; IP adresiniz, uygulamayı ziyaret ettiğiniz saatler vb. otomatik yöntemlerle ve uygulamamıza üye olmak için tarafınızca doldurulan form yönetmi ile elde edilmektedir.
            Kişisel Verileri İşleme Amaçları ve Hukuki Sebepleri
            Söz konusu kişisel verileriniz, Kanun’da md.5 ve 6’da belirtilen veri işleme şartlarına uygun olarak, iş ortaklarının imza yetkililerinin kişisel verilerini işlerken sözleşmenin kurulması ve ifası hukuki sebebine dayalı olarak, diğer durumlarda ise, veri sorumlusunun hukuki yükümlülüğü, bir hakkın tesisi, kullanılması veya korunması ile veri işleme faaliyetinin veri sorumlusunun meşru menfaatleri için zorunlu olması hukuki sebeplerine dayalı olarak işlenmektedir. Bununla birlikte, veri işleme faaliyetinde söz konusu hukuki sebeplerden en az birinin olmadığı durumlarda ilgili kişinin açık rızası sorulmakta ve rızanızı vermeniz halinde bu hukuki sebebe dayalı olarak kişisel veri işlenmektedir.
                Bu kapsamda kişisel verileriniz:</Text>
            <Text style={styles.text}>•	Hizmet sürekliliğinin sağlanması faaliyetlerinin yürütülmesi,</Text>
            <Text style={styles.text}>•	İletişim faaliyetlerinin yürütülmesi, </Text>
            <Text style={styles.text}>•	Hizmet faaliyetlerinin yürütülmesi ve denetimi,</Text>
            <Text style={styles.text}>•	Faaliyet ve hizmetlerin mevzuata uygun yürütülmesi,</Text>
            <Text style={styles.text}>•	Hizmet sağlama ve operasyon süreçlerinin yürütülmesi, </Text>
            <Text style={styles.text}>•	Finans,muhasebe ve hukuk işlerinin yürütülmesi,</Text>
            <Text style={styles.text}>•	Bilgi güvenliği süreçlerinin ve yürütülmesi,</Text>
            <Text style={styles.text}>•	Veri sorumlusu operasyonlarının güvenliğinin temini,</Text>
            <Text style={styles.text}>amaçlarıyla işlenmektedir.</Text>
             <Text style={styles.subHeader}>Kişisel Verilerin Üçüncü Taraflara Aktarılması</Text>
            <Text style={styles.text}>Uygulamamız olası bir tehlike anında en hızlı yardımı size ulaştırmak için geliştirilmiştir. Bu kapsamda uygulama içerisinde yer alan “Güvende Değilim” butonuna tıklamanız verilerinizin 3. Kişiler ile paylaşılmasına onayınız anlamına gelecektir. Bu onayınız doğrultusunda kişisel verileriniz,iletişim verileriniz ve konum bilginiz uygulamayı kullanan 3. kişilerle ve yetkili kuruluşlar ile paylaşılacaktır.
            Kişisel verileriniz gerektiği takdirde; faaliyet alanları ile sınırlı olmak üzere hizmet aldığımız yazılım hizmeti sağlayan şahıs ve kuruluşlar, verdiğimiz hizmetin ifası için gerekli hizmet sağlayan yurt içindeki şahıs ve kuruluşlar, muhasebicimiz ile yalnızca hizmet ilişkisi kapsamındaki sözleşmesel ve yasal yükümlülüklerimizin tam ve gereği gibi yerine getirilebilmesi amacı ile Kanun’un 8. Maddesinde belirtilen şartlara uygun olarak paylaşılabilecektir. Verilerinizin yurt dışındaki şahıs ve kuruluşlara aktarılmayacağını bildiririz.
                Kişisel verileriniz; madde metnindeki istisnalar haricinde yasal yükümlülük altında bulunulmadığı sürece üçüncü şahıs ve kuruluşlarla paylaşılmamaktadır.</Text>
            <Text style={styles.subHeader}>Veri Sahibi Haklarını Kullanma Yöntemleri</Text>
            <Text style={styles.text}>Kişisel veri sahibi (ilgili kişi) olarak, kişisel verilerinizin işlenip işlenmediğini öğrenme ve kişisel verilerinizin düzeltilmesini talep etme gibi Kanun md.11’de yer alan bazı haklara sahipsiniz. Bu haklar aşağıdaki gibidir:</Text>
            <Text style={styles.text}>•	Kişisel verilerinin işlenip işlenmediğini öğrenmek.</Text>
            <Text style={styles.text}>•	Kişisel verileri işlenmişse buna ilişkin bilgi talep etmek.</Text>
            <Text style={styles.text}>•	Kişisel verilerinin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenmek.</Text>
            <Text style={styles.text}>•	Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</Text>
            <Text style={styles.text}>•	Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini istemek.</Text>
            <Text style={styles.text}>•	Kişisel verilerin silinmesini veya yok edilmesini istemek.</Text>
            <Text style={styles.text}>•	Kişisel verilerin düzeltilmesi, silinmesi veya yok edilmesine ilişkin işlemlerin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini istemek.</Text>
            <Text style={styles.text}>•	İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etmek.</Text>
                <Text style={styles.text}>•	Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etmek.</Text>
            <Text style={styles.text}>Haklarınızı kullanmak istemeniz durumunda, Veri Sorumlusuna Başvuru Usul Ve Esasları Hakkında Tebliğ’in 5/1 maddesinde belirtilen yöntemlerle bize iletebilirsiniz.
            İşbu aydınlatma metni ve kişisel verilerinizin işlenmesine ilişkin tüm sorularınız için oceder@gmail.com e-posta adresi üzerinden iletişime geçebilirsiniz.
            </Text>
            </View>
            <View  style={styles.checkBoxContainer}>
                <CheckBox
                    center
                    containerStyle={styles.checkBoxContainer}
                    title="Onaylıyorum"
                    checked={isSelected}
                    onPress={clickHandler}
                />
            </View>

        </ScrollView>
    )
}


export default KVKKScreen;

const styles = StyleSheet.create({
    container: {
        fontWeight: "500",
        backgroundColor: '#d6cbd3',
        padding: 5,
    },
    checkBoxContainer: {
        backgroundColor: '#d6cbd3',
        padding: 20,
        color: '#f7786b',
        fontSize: 24,
        fontWeight: 'bold'
    },
    header: {
        fontWeight: "900",
        fontSize: 20,
        color: '#f7786b',
        padding: 5,
        textAlign: 'center'
    },
    text: {
        padding: 5,
        fontSize: 16
    },
    subHeader: {
        padding: 10,
        fontSize: 18,
        color: '#f7786b',
        fontWeight: '700',
        textAlign: 'center'
    }
})