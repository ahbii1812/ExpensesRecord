plat=$1
appDir=$WORKSPACE/android/gradle.properties

echo "current path=="+$WORKSPACE
echo "appDir=="+$appDir
 find $appDir -name "*.keystore" -exec rm -f {} \;
 buildKeyTime=`date "+%m%d_%M%S"`
 alias=${plat}-alias
 pwd=newbb123456
 cd $appDir
 keytool -genkeypair -alias $alias -keyalg RSA -validity 20000 -keystore $alias.keystore -keypass $pwd --storepass $pwd  -dname "C=CN,ST=GD,L=SZ,O=vihoo,OU=dev,CN=qp.com"
 sed -i ''  "s#^KEYSTORE_FILE_NAME=.*#KEYSTORE_FILE_NAME=$alias.keystore#g"  gradle.properties
 sed -i ''  "s#^KEYSTORE_PASSWORD=.*#KEYSTORE_PASSWORD=$pwd#g"  gradle.properties
 sed -i ''  "s#^KEYSTORE_ALIAS_NAME=.*#KEYSTORE_ALIAS_NAME=$alias#g"  gradle.properties
 mv "${alias}.keystore" "./app/${alias}.keystore"
 cat gradle.properties

 echo Process Done
