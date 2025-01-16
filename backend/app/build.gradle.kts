plugins {
    application
    id("java")
    id("war")
    id("io.freefair.lombok") version "8.10"

}

repositories {
    mavenCentral()
}

dependencies {
    implementation("com.google.code.gson:gson:2.11.0");

    implementation("org.hibernate.orm:hibernate-core:6.6.1.Final");
    implementation("org.postgresql:postgresql:42.7.3");
    implementation("org.hibernate:hibernate-core:5.6.14.Final");
    implementation("org.hibernate:hibernate-entitymanager:5.6.14.Final");

    compileOnly("jakarta.platform:jakarta.jakartaee-api:10.0.0")
    implementation(platform("org.glassfish.jersey:jersey-bom:3.1.2"))
    implementation("org.glassfish.jersey.containers:jersey-container-servlet")
    implementation("org.glassfish.jersey.inject:jersey-hk2")

    testImplementation(platform("org.junit:junit-bom:5.11.3"))
	testImplementation("org.junit.jupiter:junit-jupiter")
    testImplementation("org.mockito:mockito-core:5.14.2")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

testing {
    suites {
        val test by getting(JvmTestSuite::class) {
            useJUnit("4.13.2")
        }
    }
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}

application {
    mainClass = "org.example.App"
}
